import datetime
import uuid

from app.main import db
from app.main.model.event import Event, EventAction, AffectedAttribute

from .incident_status import get_a_incident_status
from .incident_severity import get_a_incident_severity

def save_new_event(data):
    new_event = Event()
    new_event.id = str(uuid.uuid4())

    try:
        new_event.action = data['action']
    except KeyError:
        pass

    try:
        new_event.reference_id = data['reference_id']
    except KeyError:
        pass
    
    try:
        new_event.description = data['description']
    except KeyError:
        pass
    
    try:
        new_event.intiator = data['intiator']
    except KeyError:
        pass

    try:
        new_event.linked_event_id = data['linked_event_id']
    except KeyError:
        pass

    try:
        new_event.incident_id = data['incident_id']
    except KeyError:
        pass
    
    try:
        new_event.affected_attribute = data['affected_attribute']
    except KeyError:
        pass
    
    db.session.add(new_event)
    db.session.commit()

def get_an_event(id):
    return Event.query.filter_by(id=id).first()

def get_incident_events(incident_id):
    return Event.query.filter_by(incident_id=incident_id).all()

def get_trail_events(incident_id):
    events = Event.query.filter_by(incident_id=incident_id).all()
    output = []

    for event in events:
        event_dict = event.to_dict()
        event_dict["data"] = {}

        if event.action == EventAction.CREATED:
            continue
        
        if event.action == EventAction.ATTRIBUTE_CHANGED:
            if event.affected_attribute == AffectedAttribute.STATUS:
                new_status = get_a_incident_status(event.reference_id)
                event_dict["data"] = {
                    "status_type": new_status.status_type.name
                }
            elif event.affected_attribute == AffectedAttribute.SEVERITY:
                new_status = get_a_incident_severity(event.reference_id)
                event_dict["data"] = {
                    "severity_type": new_status.severity_type.name
                }

        output.append(event_dict)
    
    return output


