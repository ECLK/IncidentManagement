from .models import (
    Incident,
    IncidentStatus,
    IncidentSeverity,
    StatusType,
    SeverityType,
    Reporter,
)
from django.contrib.auth.models import User

from ..events import services as event_services


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

    if incident.hasPendingStatusChange:
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
            approved=False
        )
        status.save()
        incident.hasPendingStatusChange = True
        event_services.update_incident_status_event(user, incident, status, False)

    elif user.has_perm("incidents.can_change_status"):
        status = IncidentStatus(
            current_status=status_type,
            previous_status=incident.current_status,
            incident=incident,
            approved=True
        )
        status.save()
        event_services.update_incident_status_event(user, incident, status, True)

    return ("success", "Status updated")


def update_incident_severity(
    incident: Incident, user: User, severity_type_str: str
) -> None:

    if incident.hasPendingSeverityChange:
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
            approved=False
        )
        severity.save()
        incident.hasPendingSeverityChange = True
        event_services.update_incident_severity_event(user, incident, severity, False)
    
    elif user.has_perm("incidents.can_change_severity"):
        severity = IncidentSeverity(
            current_severity=severity_type,
            previous_severity=incident.current_severity,
            incident=incident,
            approved=True
        )
        severity.save()
        event_services.update_incident_severity_event(user, incident, severity, True)

    return ("success", "Severity updated")

def get_incidents_by_status(status_type_str: str) -> Incident:
    try:
        incidents =  Incident.objects.all()
        filtered_incidents = (incident for incident in incidents if incident.current_status==status_type_str)
        return filtered_incidents
    except Exception as e:
        return None

def get_incidents_before_date(date: str) -> Incident:
    try:
        return Incident.objects.all().filter(created_date__lte=date)
    except Exception as e:
        return None
