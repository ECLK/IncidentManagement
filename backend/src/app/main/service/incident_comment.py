import datetime

from app.main import db
from app.main.model.incident_comment import IncidentComment


def save_new_incident_comment(data):
    new_incident_comment = IncidentComment()
    try:
        new_incident_comment.name = data['name'],
    except KeyError:
        pass
    try:
        new_incident_comment.body = data['body'],
    except KeyError:
        pass
    try:
        new_incident_comment.sn_body = data['sn_body'],
    except KeyError:
        pass
    try:
        new_incident_comment.tm_body = data['tm_body'],
    except KeyError:
        pass
    try:
        new_incident_comment.incident_id = data['incident_id'],
    except KeyError:
        pass
    try:
        new_incident_comment.user_id = data['user_id'],
    except KeyError:
        pass
    try:
        new_incident_comment.role_id = data['role_id'],
    except KeyError:
        pass
    try:
        new_incident_comment.is_active = data['is_active'],
    except KeyError:
        pass
    try:
        new_incident_comment.created_date = data['created_date'],
    except KeyError:
        pass
    try:
        new_incident_comment.updated_date = data['updated_date'],
    except KeyError:
        pass
    try:
        new_incident_comment.deleted_date = data['deleted_date'],
    except KeyError:
        pass
    
    save_changes(new_incident_comment)
    response_object = {
        'status': 'success',
        'message': 'Successfully created incident_comment.',
    }
    return response_object, 201

def get_all_incident_comments():
    return IncidentComment.query.all()

def get_a_incident_comment(id):
    return IncidentComment.query.filter_by(id=id).first()

def delete_a_incident_comment(id):
    incident_comment = IncidentComment.query.filter_by(id=id).first()
    if not incident_comment:
        response_object = {
            'status': 'fail',
            'message': 'IncidentComment with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(incident_comment)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted incident_comment with id ' + id + '.',
        }
        return response_object, 201

def update_a_incident_comment(id, data):
    incident_comment = IncidentComment.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        incident_comment.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.body = data['body']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.sn_body = data['sn_body']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.tm_body = data['tm_body']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.incident_id = data['incident_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.user_id = data['user_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.role_id = data['role_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.is_active = data['is_active']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.created_date = data['created_date']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.updated_date = data['updated_date']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident_comment.deleted_date = data['deleted_date']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated incident_comment.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in incident_comment.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

