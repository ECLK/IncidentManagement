import datetime

from app.main import db
from app.main.model.role import Role


def save_new_role(data):
    new_role = Role()
    try:
        new_role.entiry_id = data['entiry_id'],
    except KeyError:
        pass
    try:
        new_role.name = data['name'],
    except KeyError:
        pass
    try:
        new_role.sn_name = data['sn_name'],
    except KeyError:
        pass
    try:
        new_role.tm_name = data['tm_name'],
    except KeyError:
        pass
    
    save_changes(new_role)
    response_object = {
        'status': 'success',
        'message': 'Successfully created role.',
    }
    return response_object, 201

def get_all_roles():
    return Role.query.all()

def get_a_role(id):
    return Role.query.filter_by(id=id).first()

def delete_a_role(id):
    role = Role.query.filter_by(id=id).first()
    if not role:
        response_object = {
            'status': 'fail',
            'message': 'Role with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(role)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted role with id ' + id + '.',
        }
        return response_object, 201

def update_a_role(id, data):
    role = Role.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        role.entiry_id = data['entiry_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        role.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        role.sn_name = data['sn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        role.tm_name = data['tm_name']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated role.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in role.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

