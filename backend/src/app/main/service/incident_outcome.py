import datetime

from app.main import db
from app.main.model.incident_outcome import IncidentOutcome


def save_new_incident_outcome(data):
    new_incident_outcome = IncidentOutcome()
    try:
        new_incident_outcome.incident_id = data['incident_id']
    except KeyError:
        pass
    try:
        new_incident_outcome.type = data['type']
    except KeyError:
        pass
    try:
        new_incident_outcome.title = data['title']
    except KeyError:
        pass
    try:
        new_incident_outcome.sn_title = data['sn_title']
    except KeyError:
        pass
    try:
        new_incident_outcome.tm_title = data['tm_title']
    except KeyError:
        pass
    try:
        new_incident_outcome.description = data['description']
    except KeyError:
        pass
    try:
        new_incident_outcome.sn_description = data['sn_description']
    except KeyError:
        pass
    try:
        new_incident_outcome.tn_description = data['tn_description']
    except KeyError:
        pass
    try:
        new_incident_outcome.created_date = data['created_date']
    except KeyError:
        pass
    
    save_changes(new_incident_outcome)
    response_object = {
        'status': 'success',
        'message': 'Successfully created incident_outcome.',
    }
    return response_object, 201

def get_all_incident_outcomes():
    return IncidentOutcome.query.all()

def get_a_incident_outcome(id):
    return IncidentOutcome.query.filter_by(id=id).first()

def delete_a_incident_outcome(id):
    incident_outcome = IncidentOutcome.query.filter_by(id=id).first()
    if not incident_outcome:
        response_object = {
            'status': 'fail',
            'message': 'IncidentOutcome with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(incident_outcome)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted incident_outcome with id ' + id + '.',
        }
        return response_object, 201

def update_a_incident_outcome(id, data):
    incident_outcome = IncidentOutcome.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        incident_outcome.incident_id = data['incident_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_outcome.type = data['type']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_outcome.title = data['title']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_outcome.sn_title = data['sn_title']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_outcome.tm_title = data['tm_title']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_outcome.description = data['description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_outcome.sn_description = data['sn_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_outcome.tn_description = data['tn_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_outcome.created_date = data['created_date']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated incident_outcome.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in incident_outcome.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

