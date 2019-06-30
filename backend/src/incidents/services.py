from .models import (
    Incident,
    IncidentStatus,
    IncidentSeverity,
    StatusType,
    SeverityType,
    Reporter,
    IncidentComment,
)
from django.contrib.auth.models import User, Group

from ..events import services as event_services
from django.db import connection


def is_valid_incident(incident_id: str) -> bool:
    try:
        incident = Incident.objects.get(id=incident_id)
        return True
    except Exception as e:
        return False


def get_incident_by_id(incident_id: str) -> Incident:
    try:
        return Incident.objects.get(id=incident_id)
    except Exception as e:
        return None


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


def create_incident_postscript(incident: Incident, user: User) -> None:
    """Function to take care of event, status and severity creation"""
    status = IncidentStatus(current_status=StatusType.NEW, incident=incident)
    status.save()

    severity = IncidentSeverity(
        current_severity=SeverityType.DEFAULT, incident=incident
    )
    severity.save()

    reporter = Reporter()
    reporter.save()

    incident.reporter = reporter
    incident.save()

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
            return ("error", "Error in finding auto assignment")

        assignee = User.objects.get(id=row[0])
        incident.assignee = assignee
        incident.save()

        return ("success", "Auto assign completed")

def incident_escalate(incident: Incident, escalate_dir: str = "UP"):
    # find the rank of the current incident assignee
    assignee_groups = incident.assignee.groups.all()
    if len(assignee_groups) == 0:
        return ("error", "No group for current assignee")

    current_rank = assignee_groups[0].rank

    # if escalate UP
    next_rank = current_rank - 1
    if escalate_dir == "DOWN":
        next_rank = current_rank + 1
    
    next_group = Group.objects.get(rank=next_rank)
    if next_group is None:
        return ("error", "Can't escalate %s from here" % escalate_dir)

    return incident_auto_assign(incident, next_group)
