import datetime

from app.main import db
from app.main.model.event import Event

def save_new_event(data):
    new_event = Event()
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
        new_event.approver = data['approver']
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

    try:
        new_event.is_approved = data['is_approved']
    except KeyError:
        pass
    
    save_changes(new_event)

def get_an_event(id):
    return Event.query.filter_by(id=id).first()

def get_incident_events(incident_id):
    return Event.query.filter_by(incident_id=incident_id).all()

def save_changes(data):
    db.session.add(data)
    db.session.commit()

