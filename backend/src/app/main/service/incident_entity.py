import datetime

from app.main import db
from app.main.model.incident_entity import IncidentEntity


def save_new_incident_entity(data):
    new_incident_entity = IncidentEntity()
    try:
        new_incident_entity.incident_id = data['incident_id']
    except KeyError:
        pass
    try:
        new_incident_entity.entity_id = data['entity_id']
    except KeyError:
        pass
    try:
        new_incident_entity.description = data['description']
    except KeyError:
        pass
    try:
        new_incident_entity.sn_description = data['sn_description']
    except KeyError:
        pass
    try:
        new_incident_entity.tn_description = data['tn_description']
    except KeyError:
        pass
    try:
        new_incident_entity.created_date = data['created_date']
    except KeyError:
        pass
    
    save_changes(new_incident_entity)
    response_object = {
        'status': 'success',
        'message': 'Successfully created incident_entity.',
    }
    return response_object, 201

def get_all_incident_entitys():
    return IncidentEntity.query.all()

def get_a_incident_entity(id):
    return IncidentEntity.query.filter_by(id=id).first()

def delete_a_incident_entity(id):
    incident_entity = IncidentEntity.query.filter_by(id=id).first()
    if not incident_entity:
        response_object = {
            'status': 'fail',
            'message': 'IncidentEntity with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(incident_entity)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted incident_entity with id ' + id + '.',
        }
        return response_object, 201

def update_a_incident_entity(id, data):
    incident_entity = IncidentEntity.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        incident_entity.incident_id = data['incident_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_entity.entity_id = data['entity_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_entity.description = data['description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_entity.sn_description = data['sn_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_entity.tn_description = data['tn_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_entity.created_date = data['created_date']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated incident_entity.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in incident_entity.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

