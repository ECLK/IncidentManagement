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
    incident: Incident, user: User, status_type: StatusType
) -> None:

    try:
        # check for valid status type
        status_type = StatusType[status_type]
    except:
        return ("error", "Invalid status type")

    status = IncidentStatus(
        current_status=status_type,
        previous_status=incident.current_status,
        incident=incident,
    )
    status.save()

    event_services.update_incident_status_event(user, incident, status)

    return ("success", "Status updated")

