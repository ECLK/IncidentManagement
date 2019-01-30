import datetime

from app.main import db
from app.main.model.action_entity import ActionEntity


def save_new_action_entity(data):
    new_action_entity = ActionEntity()
    try:
        new_action_entity.type = data['type'],
    except KeyError:
        pass
    try:
        new_action_entity.category = data['category'],
    except KeyError:
        pass
    try:
        new_action_entity.name = data['name'],
    except KeyError:
        pass
    try:
        new_action_entity.description = data['description'],
    except KeyError:
        pass
    try:
        new_action_entity.sn_name = data['sn_name'],
    except KeyError:
        pass
    try:
        new_action_entity.sn_description = data['sn_description'],
    except KeyError:
        pass
    try:
        new_action_entity.tn_name = data['tn_name'],
    except KeyError:
        pass
    try:
        new_action_entity.tn_description = data['tn_description'],
    except KeyError:
        pass
    
    save_changes(new_action_entity)
    response_object = {
        'status': 'success',
        'message': 'Successfully created action_entity.',
    }
    return response_object, 201

def get_all_action_entitys():
    return ActionEntity.query.all()

def get_a_action_entity(id):
    return ActionEntity.query.filter_by(id=id).first()

def delete_a_action_entity(id):
    action_entity = ActionEntity.query.filter_by(id=id).first()
    if not action_entity:
        response_object = {
            'status': 'fail',
            'message': 'ActionEntity with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(action_entity)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted action_entity with id ' + id + '.',
        }
        return response_object, 201

def update_a_action_entity(id, data):
    action_entity = ActionEntity.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        action_entity.type = data['type']
        status = SUCESS
    except KeyError:
        pass
    try:
        action_entity.category = data['category']
        status = SUCESS
    except KeyError:
        pass
    try:
        action_entity.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        action_entity.description = data['description']
        status = SUCESS
    except KeyError:
        pass
    try:
        action_entity.sn_name = data['sn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        action_entity.sn_description = data['sn_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        action_entity.tn_name = data['tn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        action_entity.tn_description = data['tn_description']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated action_entity.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in action_entity.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

