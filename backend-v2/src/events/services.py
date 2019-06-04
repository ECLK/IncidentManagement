"""Contains the domain model / business logic for events"""

from .models import Event

def resolve_event_data(event: Event):
    return event
    
def get_events_by_incident_id(incident_id: int):
    events = Event.objects.filter(incident_id=incident_id)
    print(events)