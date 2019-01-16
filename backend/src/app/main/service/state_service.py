import uuid
import datetime

from app.main import db
from app.main.model.state import State


def save_new_state(data):
    state = State.query.filter_by(name=data['name']).first()
    if not state:
        new_state = State(
            name=data['name']
        )
        save_changes(new_state)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.',
        }
        return response_object, 201
    else:
        response_object = {
            'status': 'fail',
            'message': 'State already exists. Please Log in.',
        }
        return response_object, 409


def get_all_states():
    return State.query.all()


def get_a_state(public_id):
    return State.query.filter_by(id=public_id).first()


def save_changes(data):
    db.session.add(data)
    db.session.commit()

