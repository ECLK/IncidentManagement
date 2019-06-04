"""Contains the domain model / business logic for events"""

from .models import Event, EventAction


def resolve_event_data(event: Event):
    return event


def get_events_by_incident_id(incident_id: int):
    events = Event.objects.filter(incident_id=incident_id)

    return events


def create_event(event_action, initiator, 
                 incident_id, affected_attribute, reference_id):

    event = Event(
        action = event_action,
        reference_id = reference_id,
        initiator = initiator,
        incident = incident_id,
        affected_attribute = affected_attribute
    )

    event.save()
