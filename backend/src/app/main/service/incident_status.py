import datetime

from app.main import db
from app.main.model.incident_status import IncidentStatus


def save_new_incident_status(data):
    new_incident_status = IncidentStatus()
    try:
        new_incident_status.name = data['status_type']
    except KeyError:
        pass
    try:
        new_incident_status.incident_id = data['incident_id']
    except KeyError:
        pass
    try:
        new_incident_status.executed_at = data['created_at']
    except KeyError:
        pass
    
    save_changes(new_incident_status)
    return new_incident_status

def get_all_incident_statuss():
    return IncidentStatus.query.all()

def get_a_incident_status(id):
    return IncidentStatus.query.filter_by(id=id).first()

def save_changes(data):
    db.session.add(data)
    db.session.commit()

