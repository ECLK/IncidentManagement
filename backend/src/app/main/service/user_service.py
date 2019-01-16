import uuid
import datetime

from app.main import db
from app.main.model.user import User


def save_new_user(data):
    user = User.query.filter_by(name = data['name']).first()
    if not user:
        new_user = User(
            name=data['name']
        )
        save_changes(new_user)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.',
        }
        return response_object, 201
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists.',
        }
        return response_object, 409


def get_all_users():
    return User.query.all()


def get_a_user(id):
    return User.query.filter_by(id=id).first()

def delete_a_user(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        response_object = {
            'status': 'fail',
            'message': 'User does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(user)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted user.',
        }
        return response_object, 201
        


def save_changes(data):
    db.session.add(data)
    db.session.commit()

