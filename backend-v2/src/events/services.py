"""Contains the domain model / business logic for events"""

from .models import Event, EventAction


def get_events_by_incident_id(incident_id: str):
    events = Event.objects.filter(incident_id=incident_id)

    return events


def create_event(event_action, initiator, incident, 
                 affected_attribute=None, 
                 reference_id=None,
                 description=None,
                 linked_event=None
                ):

    event = Event(
        action = event_action,
        reference_id = reference_id,
        initiator = initiator,
        incident = incident,
        affected_attribute = affected_attribute
    )

    event.save()

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



