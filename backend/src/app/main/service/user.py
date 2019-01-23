import datetime

from app.main import db
from app.main.model.user import User


def save_new_user(data):
    new_user = User()
    try:
        new_user.role_id = data['role_id'],
    except KeyError:
        pass
    try:
        new_user.name = data['name'],
    except KeyError:
        pass
    try:
        new_user.sn_name = data['sn_name'],
    except KeyError:
        pass
    try:
        new_user.tm_name = data['tm_name'],
    except KeyError:
        pass
    
    save_changes(new_user)
    response_object = {
        'status': 'success',
        'message': 'Successfully created user.',
    }
    return response_object, 201

def get_all_users():
    return User.query.all()

def get_a_user(id):
    return User.query.filter_by(id=id).first()

def delete_a_user(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        response_object = {
            'status': 'fail',
            'message': 'User with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(user)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted user with id ' + id + '.',
        }
        return response_object, 201

def update_a_user(id, data):
    user = User.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        user.role_id = data['role_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        user.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        user.sn_name = data['sn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        user.tm_name = data['tm_name']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated user.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in user.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

