import datetime

from app.main import db
from app.main.model.incident_status import IncidentStatus


def save_new_incident_status(data):
    new_incident_status = IncidentStatus()
    try:
        new_incident_status.name = data['name'],
    except KeyError:
        pass
    try:
        new_incident_status.detail = data['detail'],
    except KeyError:
        pass
    try:
        new_incident_status.incident_id = data['incident_id'],
    except KeyError:
        pass
    try:
        new_incident_status.executed_at = data['executed_at'],
    except KeyError:
        pass
    
    save_changes(new_incident_status)
    response_object = {
        'status': 'success',
        'message': 'Successfully created incident_status.',
    }
    return response_object, 201

def get_all_incident_statuss():
    return IncidentStatus.query.all()

def get_a_incident_status(id):
    return IncidentStatus.query.filter_by(id=id).first()

def delete_a_incident_status(id):
    incident_status = IncidentStatus.query.filter_by(id=id).first()
    if not incident_status:
        response_object = {
            'status': 'fail',
            'message': 'IncidentStatus with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(incident_status)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted incident_status with id ' + id + '.',
        }
        return response_object, 201

def update_a_incident_status(id, data):
    incident_status = IncidentStatus.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        incident_status.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_status.detail = data['detail']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_status.incident_id = data['incident_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_status.executed_at = data['executed_at']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated incident_status.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in incident_status.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

