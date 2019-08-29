from .models import (
    Incident,
    IncidentStatus,
    IncidentSeverity,
    StatusType,
    SeverityType,
    Reporter,
    IncidentComment,
    IncidentPoliceReport,
)
from django.contrib.auth.models import User, Group

from ..events import services as event_services
from ..events.models import Event
from ..file_upload.models import File
from django.db import connection

from .exceptions import WorkflowException, IncidentException
import pandas as pd
from django.http import HttpResponse
from xhtml2pdf import pisa


def is_valid_incident(incident_id: str) -> bool:
    try:
        incident = Incident.objects.get(id=incident_id)
        return True
    except Exception as e:
        return False


def get_incident_by_id(incident_id: str) -> Incident:
    try:
        incident = Incident.objects.get(id=incident_id)
        if incident is None:
            raise IncidentException("Invalid incident id")
    except:
        raise IncidentException("Invalid incident id")

    return incident


def get_user_by_id(user_id: str) -> User:
    try:
        user = User.objects.get(id=user_id)
        if user is None:
            raise IncidentException("Invalid user id")
    except:
        raise IncidentException("Invalid user id")

    return user


def get_reporter_by_id(reporter_id: str) -> Incident:
    try:
        return Reporter.objects.get(id=reporter_id)
    except Exception as e:
        return None


def get_comments_by_incident(incident: Incident) -> IncidentComment:
    try:
        return IncidentComment.objects.get(incident=incident)
    except Exception as e:
        return None

def get_user_group(user: User):
    user_groups = user.groups.all()
    if len(user_groups) == 0:
        raise WorkflowException("No group for current assignee")

    return user_groups[0]

def get_guest_user():
    try:
        return User.objects.get(username="guest")
    except:
        raise IncidentException("No guest user available")


def create_incident_postscript(incident: Incident, user: User) -> None:
    """Function to take care of event, status and severity creation"""
    if user is None:
        # public user case
        # if no auth token, then we assign the guest user as public user
        user = get_guest_user()
        
    reporter = Reporter()
    reporter.save()

    incident.reporter = reporter
    incident.assignee = user
    incident.save()

    # if the user is from the guest group (public user or data entry operator)
    # auto escalate it
    user_group = get_user_group(user)
    if user_group.name == "guest":
        print(incident.current_status)
        incident_escalate(user, incident)

    status = IncidentStatus(current_status=StatusType.NEW,
                            incident=incident, approved=True)
    status.save()

    severity = IncidentSeverity(
        current_severity=10, incident=incident, approved=True
    )
    severity.save()

    event_services.create_incident_event(user, incident)

def update_incident_postscript(incident: Incident, user: User) -> None:
    event_services.create_comment_event(user, incident)


def update_incident_status(
    incident: Incident, user: User, status_type_str: str
) -> None:

    if incident.hasPendingStatusChange == "T":
        return ("error", "Incident status is locked for pending changes")

    try:
        # check for valid status type
        status_type = StatusType[status_type_str]
    except:
        return ("error", "Invalid status type")

    if user.has_perm("incidents.can_request_status_change"):
        # if user can't directly change the status
        # only a pending change is added
        status = IncidentStatus(
            current_status=status_type,
            previous_status=incident.current_status,
            incident=incident,
            approved=False,
        )
        status.save()
        incident.hasPendingStatusChange = "T"
        incident.save()
        event_services.update_incident_status_event(
            user, incident, status, False)

    elif user.has_perm("incidents.can_change_status"):
        status = IncidentStatus(
            current_status=status_type,
            previous_status=incident.current_status,
            incident=incident,
            approved=True,
        )
        status.save()
        incident.hasPendingStatusChange = "F"
        incident.save()
        event_services.update_incident_status_event(
            user, incident, status, True)

    return ("success", "Status updated")


def update_incident_severity(
    incident: Incident, user: User, severity_type_str: str
) -> None:

    if incident.hasPendingSeverityChange == "T":
        return ("error", "Incident severity is locked for pending changes")

    try:
        # check for valid severity type
        severity_type = SeverityType[severity_type_str]
    except:
        return ("error", "Invalid severity type")

    if user.has_perm("incidents.can_request_severity_change"):
        severity = IncidentSeverity(
            current_severity=severity_type,
            previous_severity=incident.current_severity,
            incident=incident,
            approved=False,
        )
        severity.save()
        incident.hasPendingSeverityChange = "T"
        incident.save()
        event_services.update_incident_severity_event(
            user, incident, severity, False)

    elif user.has_perm("incidents.can_change_severity"):
        severity = IncidentSeverity(
            current_severity=severity_type,
            previous_severity=incident.current_severity,
            incident=incident,
            approved=True,
        )
        severity.save()
        incident.hasPendingSeverityChange = "F"
        incident.save()
        event_services.update_incident_severity_event(
            user, incident, severity, True)

    return ("success", "Severity updated")


def create_incident_comment_postscript(
    incident: Incident, user: User, comment: IncidentComment
) -> None:
    """Function to take care of event, status and severity creation"""

    if comment.is_outcome:
        event_services.create_outcome_event(user, incident, comment)
    else:
        event_services.create_comment_event(user, incident, comment)


def get_incidents_by_status(status_type_str: str) -> Incident:
    try:
        incidents = Incident.objects.all()
        filtered_incidents = (
            incident for incident in incidents if incident.current_status == status_type_str)
        return filtered_incidents
    except Exception as e:
        return None


def get_incidents_before_date(date: str) -> Incident:
    try:
        return Incident.objects.all().filter(created_date__lte=date)
    except Exception as e:
        return None


def incident_auto_assign(incident: Incident, user_group: Group):
    """auto assign will find the user from the given user group with minimum
       # of incidents already assigned
    """

    # should we move this to a view / procedure lateron?
    # also query optimizations here are welcome
    sql = """
            SELECT usr.id, COUNT(incident.id) as incident_count FROM `auth_user` as usr 
            LEFT JOIN incidents_incident as incident on incident.assignee_id = usr.id 
            INNER JOIN auth_user_groups on usr.id = auth_user_groups.user_id
            INNER JOIN auth_group as grp on grp.id = auth_user_groups.group_id
            WHERE grp.rank = %d
            GROUP BY usr.id
            ORDER BY incident_count ASC
          """ % user_group.rank

    with connection.cursor() as cursor:
        cursor.execute(sql)
        row = cursor.fetchone()
        if row is None:
            raise WorkflowException("Error in finding auto assignment")
        
        try:
            assignee = User.objects.get(id=row[0])
            incident.assignee = assignee
            incident.save()

            return assignee
        except:
            raise WorkflowException("Error in finding auto assignment")


def incident_escalate(user: User, incident: Incident, escalate_dir: str = "UP"):
    if incident.assignee != user:
        raise WorkflowException("Only current incident assignee can escalate the incident")
    
    if (
        # incident.current_status == StatusType.VERIFIED.name 
        incident.current_status == StatusType.NEW.name
        or incident.current_status == StatusType.ACTION_PENDING.name
        or incident.current_status == StatusType.ADVICE_REQESTED.name
    ) :
        raise WorkflowException("Incident cannot be escalated")

    # find the rank of the current incident assignee
    assignee_groups = incident.assignee.groups.all()
    if len(assignee_groups) == 0:
        raise WorkflowException("No group for current assignee")

    current_rank = assignee_groups[0].rank

    # if escalate UP
    next_rank = current_rank - 1
    if escalate_dir == "DOWN":
        next_rank = current_rank + 1

    next_group = Group.objects.get(rank=next_rank)
    if next_group is None:
        raise WorkflowException("Can't escalate %s from here" % escalate_dir)

    assignee = incident_auto_assign(incident, next_group)
    event_services.create_assignment_event(user, incident, assignee)


def incident_change_assignee(user: User, incident: Incident, assignee: User):
    incident.assignee = assignee
    incident.save()

    event_services.create_assignment_event(user, incident, assignee)


def incident_close(user: User, incident: Incident, comment: str):
    # find number of outcomes for the incident
    outcomes = IncidentComment.objects.filter(
        incident=incident, is_outcome=True).count()

    if incident.hasPendingStatusChange == "T":
        raise WorkflowException("Incident has pending changes, can not close")

    if incident.current_status == StatusType.ACTION_PENDING:
        raise WorkflowException(
            "All pending actions needs to be resolved first")

    if outcomes == 0:
        raise WorkflowException(
            "Incident need at least 1 outcome before closing")

    status = IncidentStatus(
        current_status=StatusType.CLOSED,
        previous_status=incident.current_status,
        incident=incident
    )

    if user.has_perm("incidents.can_request_status_change"):
        # if user can't directly change the status
        # only a pending change is added
        status.approved = False
        status.save()

        incident.hasPendingStatusChange = "T"
        incident.save()

        event_services.update_status_with_description_event(
            user, incident, status, False, comment)

    elif user.has_perm("incidents.can_change_status"):
        status.approved = True
        status.save()

        incident.hasPendingStatusChange = "F"
        incident.save()

        event_services.update_status_with_description_event(
            user, incident, status, True, comment)


def incident_escalate_external_action(user: User, incident: Incident, comment: str):
    # new event
    status = IncidentStatus(
        current_status=StatusType.ACTION_PENDING,
        previous_status=incident.current_status,
        incident=incident,
        approved=True
    )
    status.save()

    event_services.start_action_event(user, incident, status, comment)


def incident_complete_external_action(user: User, incident: Incident, comment: str, start_event: Event):
    # new event
    status = IncidentStatus(
        current_status=StatusType.ACTION_PENDING,
        previous_status=incident.current_status,
        incident=incident,
        approved=True
    )
    status.save()

    event_services.complete_action_event(
        user, incident, status, comment, start_event)


def incident_request_advice(user: User, incident: Incident, assignee: User, comment: str):
    if incident.current_status == StatusType.ADVICE_REQESTED.name:
        raise WorkflowException("Incident already has a pending advice request")

    status = IncidentStatus(
        current_status=StatusType.ADVICE_REQESTED,
        previous_status=incident.current_status,
        incident=incident,
        approved=True
    )
    status.save()

    incident.linked_individuals.add(assignee)
    incident.save()

    event_services.update_status_with_description_event(user, incident, status, True, comment)


def incident_provide_advice(user: User, incident: Incident, advice: str, start_event: Event):
    if not Incident.objects.filter(linked_individuals__id=user.id).exists():
        raise WorkflowException("User not linked to the given incident")

    if incident.current_status != StatusType.ADVICE_REQESTED.name:
        raise WorkflowException("Incident does not have pending advice requests")

    status = IncidentStatus(
        current_status=StatusType.ADVICE_PROVIDED,
        previous_status=incident.current_status,
        incident=incident,
        approved=True
    )
    status.save()

    # check this
    incident.linked_individuals.remove(user.id)

    event_services.provide_advice_event(user, incident, status, advice, start_event)

def incident_verify(user: User, incident: Incident, comment: str):
    if incident.current_status != StatusType.NEW.name:
        raise WorkflowException("Can only verify unverified incidents")

    if incident.assignee != user:
        raise WorkflowException("Only assignee can verify the incident")

    status = IncidentStatus(
        current_status=StatusType.VERIFIED,
        previous_status=incident.current_status,
        incident=incident,
        approved=True
    )
    status.save()

    event_services.update_status_with_description_event(user, incident, status, True, comment)

def get_police_report_by_incident(incident: Incident):
    try:
        incident_police_report = IncidentPoliceReport.objects.get(incident=incident)
        # if incident_police_report is None:
        #     raise IncidentException("No police report associated to the incident")
    except:
        # raise IncidentException("No police report associated to the incident")
        return None

    return incident_police_report

def get_incidents_to_escalate():

    sql = """
        SELECT b.incident_id, b.current_status, b.created_date
            FROM incidents_incidentstatus b
            INNER JOIN (
              SELECT i.incident_id, max(i.created_date) cdate
              FROM incidents_incidentstatus i
              GROUP BY i.incident_id
            ) c 
            ON c.incident_id = b.incident_id AND c.cdate = b.created_date
     	WHERE b.`created_date` >  NOW() - interval 120 minute AND
                b.`current_status` <> 'CLOSED' AND
                b.`current_status` <> 'ACTION_PENDING' AND
                b.`current_status` <> 'NEW' AND
                b.`current_status` <> 'ADVICE_REQESTED'
    """
    
    with connection.cursor() as cursor:
        cursor.execute(sql)
        incidents = cursor.fetchall()

        return incidents

def auto_escalate_incidents():

    incident_details = get_incidents_to_escalate()

    for incident_detail in incident_details :
        incident = get_incident_by_id(incident_detail[0])
        incident_escalate(incident.assignee, incident)

    return incident_details

def attach_media(user:User, incident:Incident, uploaded_file:File):
    """ Method to indicate media attachment """
    event_services.media_attached_event(user, incident, uploaded_file)

def get_fitlered_incidents_report(incidents: Incident, output_format: str):
    dataframe = pd.DataFrame(list(incidents.values("refId", "title", "description", "current_status", "current_severity", "response_time", "category")))
    dataframe.columns = ["Ref ID", "Title", "Description", "Status", "Severity", "Response Time", "Category"]
    
    if output_format == "csv":
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=incidents.csv'
        dataframe.to_csv(path_or_buf=response,sep=';',float_format='%.2f',index=False,decimal=",")
        return response
    
    if output_format == "pdf":
        output = dataframe.to_html(float_format='%.2f',index=False)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="incidents.pdf"'
        pisa.CreatePDF(output, dest=response)
        return response

    # if it's an unrecognized format, raise exception
    raise IncidentException("Unrecognized export format '%s'" % output_format)
