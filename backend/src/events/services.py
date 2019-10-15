"""Contains the domain model / business logic for events"""

from .models import Event, EventAction, AffectedAttribute
from ..incidents.models import IncidentStatus
from ..file_upload.models import File
from .exceptions import EventException

def get_events_by_incident_id(incident_id: str):
    events = Event.objects.filter(incident_id=incident_id)

    return events

def get_event_by_id(event_id: str):
    try:
        event = Event.objects.get(id=event_id)
        if event is None:
            raise EventAction("Invalid event id")
        return event
    except:
        raise EventAction("Invalid event id")


def create_event(event_action, initiator, incident, 
                 affected_attribute=None, 
                 refered_model=None,
                 description=None,
                 linked_event=None
                ):

    event = Event(
        action = event_action,
        refered_model=refered_model,
        initiator = initiator,
        incident = incident,
        affected_attribute = affected_attribute,
        description=description,
        linked_event=linked_event
    )

    event.save()

def create_incident_event(initiator, incident):
    create_event(
                    EventAction.CREATED,
                    initiator, 
                    incident
                )

def update_incident_event(initiator, incident, revision):
    create_event(
                    EventAction.GENERIC_UPDATE,
                    initiator, 
                    incident,
                    description=revision
                )

def update_incident_status_event(initiator, incident, status, is_approved):
    if is_approved:
        create_event(
                        EventAction.ATTRIBUTE_CHANGED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.STATUS,
                        refered_model=status                    
                    )
    else:
        create_event(
                        EventAction.ATTRIBUTE_CHANGE_REQUESTED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.STATUS,
                        refered_model=status                    
                    )

def update_incident_severity_event(initiator, incident, severity, is_approved):
    if is_approved:
        create_event(
                        EventAction.ATTRIBUTE_CHANGED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.SEVERITY,
                        refered_model=severity                    
                    )
    else:
        create_event(
                        EventAction.ATTRIBUTE_CHANGE_REQUESTED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.SEVERITY,
                        refered_model=severity                    
                    )

def create_comment_event(initiator, incident, comment):
    create_event(
                    EventAction.COMMENTED,
                    initiator, 
                    incident, 
                    refered_model=comment
                )

def create_outcome_event(initiator, incident, comment):
    create_event(
                    EventAction.OUTCOME_ADDED,
                    initiator, 
                    incident, 
                    refered_model=comment
                )

def create_assignment_event(initiator, incident, assignee, description=None):
    create_event(
                    EventAction.ENTITY_ASSIGNED,
                    initiator, 
                    incident, 
                    refered_model=assignee,
                    description=description
                )

def update_status_with_description_event(initiator, incident, status, is_approved, description):
    if is_approved:
        create_event(
                        EventAction.ATTRIBUTE_CHANGED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.STATUS,
                        refered_model=status,           
                        description=description         
                    )
    else:
        create_event(
                        EventAction.ATTRIBUTE_CHANGE_REQUESTED,
                        initiator, 
                        incident,
                        affected_attribute = AffectedAttribute.STATUS,
                        refered_model=status,
                        description=description                     
                    )

def update_workflow_event(initiator, incident, workflow):
    create_event(
                    EventAction.WORKFLOW_ACTIONED,
                    initiator, 
                    incident,
                    refered_model=workflow           
                )

def update_linked_workflow_event(initiator, incident, workflow, start_event):
    create_event(
                    EventAction.WORKFLOW_ACTIONED,
                    initiator, 
                    incident,
                    refered_model=workflow,
                    linked_event=start_event           
                )

def start_action_event(initiator, incident, status, description):
    create_event(
        EventAction.ACTION_STARTED,
        initiator,
        incident,
        affected_attribute=AffectedAttribute.STATUS,
        refered_model=status,
        description=description
    )

def complete_action_event(initiator, incident, status, description, start_event):
    create_event(
        EventAction.ACTION_COMPLETED,
        initiator,
        incident,
        affected_attribute=AffectedAttribute.STATUS,
        refered_model=status,
        description=description,
        linked_event=start_event
    )

def provide_advice_event(initiator, incident, status, description, start_event):
    create_event(
        EventAction.ATTRIBUTE_CHANGED,
        initiator,
        incident,
        affected_attribute=AffectedAttribute.STATUS,
        refered_model=status,
        description=description,
        linked_event=start_event
    )

def media_attached_event(initiator, incident, file):
    create_event(
        EventAction.MEDIA_ATTACHED,
        initiator,
        incident,
        refered_model=file
    )
