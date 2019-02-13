import datetime

from app.main import db
from app.main.model.incident_relation import IncidentRelation


def save_new_incident_relation(data):
    new_incident_relation = IncidentRelation()
    try:
        new_incident_relation.incident1_id = data['incident1_id'],
    except KeyError:
        pass
    try:
        new_incident_relation.incident2_id = data['incident2_id'],
    except KeyError:
        pass
    try:
        new_incident_relation.relationship = data['relationship'],
    except KeyError:
        pass
    try:
        new_incident_relation.description = data['description'],
    except KeyError:
        pass
    try:
        new_incident_relation.sn_description = data['sn_description'],
    except KeyError:
        pass
    try:
        new_incident_relation.tn_description = data['tn_description'],
    except KeyError:
        pass
    try:
        new_incident_relation.created_date = data['created_date'],
    except KeyError:
        pass
    
    save_changes(new_incident_relation)
    response_object = {
        'status': 'success',
        'message': 'Successfully created incident_relation.',
    }
    return response_object, 201

def get_all_incident_relations():
    return IncidentRelation.query.all()

def get_a_incident_relation(id):
    return IncidentRelation.query.filter_by(id=id).first()

def delete_a_incident_relation(id):
    incident_relation = IncidentRelation.query.filter_by(id=id).first()
    if not incident_relation:
        response_object = {
            'status': 'fail',
            'message': 'IncidentRelation with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(incident_relation)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted incident_relation with id ' + id + '.',
        }
        return response_object, 201

def update_a_incident_relation(id, data):
    incident_relation = IncidentRelation.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        incident_relation.incident1_id = data['incident1_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_relation.incident2_id = data['incident2_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_relation.relationship = data['relationship']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_relation.description = data['description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_relation.sn_description = data['sn_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_relation.tn_description = data['tn_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_relation.created_date = data['created_date']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated incident_relation.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in incident_relation.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

