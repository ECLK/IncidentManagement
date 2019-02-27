import datetime

from app.main import db
from app.main.model.incident_media import IncidentMedia


def save_new_incident_media(data):
    new_incident_media = IncidentMedia()
    try:
        new_incident_media.file_name = data['file_name']
    except KeyError:
        pass
    try:
        new_incident_media.url = data['url']
    except KeyError:
        pass
    try:
        new_incident_media.incident_id = data['incident_id']
    except KeyError:
        pass
    try:
        new_incident_media.user_id = data['user_id']
    except KeyError:
        pass
    try:
        new_incident_media.role_id = data['role_id']
    except KeyError:
        pass
    try:
        new_incident_media.is_active = data['is_active']
    except KeyError:
        pass
    try:
        new_incident_media.created_date = data['created_date']
    except KeyError:
        pass
    try:
        new_incident_media.updated_date = data['updated_date']
    except KeyError:
        pass
    try:
        new_incident_media.deleted_date = data['deleted_date']
    except KeyError:
        pass
    
    save_changes(new_incident_media)
    response_object = {
        'status': 'success',
        'message': 'Successfully created incident_media.',
    }
    return response_object, 201

def get_all_incident_medias():
    return IncidentMedia.query.all()

def get_a_incident_media(id):
    return IncidentMedia.query.filter_by(id=id).first()

def delete_a_incident_media(id):
    incident_media = IncidentMedia.query.filter_by(id=id).first()
    if not incident_media:
        response_object = {
            'status': 'fail',
            'message': 'IncidentMedia with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(incident_media)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted incident_media with id ' + id + '.',
        }
        return response_object, 201

def update_a_incident_media(id, data):
    incident_media = IncidentMedia.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        incident_media.file_name = data['file_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_media.url = data['url']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_media.incident_id = data['incident_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_media.user_id = data['user_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_media.role_id = data['role_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_media.is_active = data['is_active']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_media.created_date = data['created_date']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_media.updated_date = data['updated_date']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_media.deleted_date = data['deleted_date']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated incident_media.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in incident_media.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

