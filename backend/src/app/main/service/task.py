import datetime

from app.main import db
from app.main.model.task import Task


def save_new_task(data):
    new_task = Task(
            description = data['description'],
            state_id = data['state_id'],
            owner_id = data['owner_id'],
            created_date = data['created_date'],
            updated_date = data['updated_date'],
    )
    save_changes(new_task)
    response_object = {
        'status': 'success',
        'message': 'Successfully created task.',
    }
    return response_object, 201

def get_all_tasks():
    return Task.query.all()

def get_a_task(id):
    return Task.query.filter_by(id=id).first()

def delete_a_task(id):
    task = Task.query.filter_by(id=id).first()
    if not task:
        response_object = {
            'status': 'fail',
            'message': 'Task with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(task)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted task with id ' + id + '.',
        }
        return response_object, 201

def update_a_task(id, data):
    task = Task.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        task.description = data['description']
        status = SUCESS
    except KeyError:
        pass
    try:
        task.state_id = data['state_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        task.owner_id = data['owner_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        task.created_date = data['created_date']
        status = SUCESS
    except KeyError:
        pass
    try:
        task.updated_date = data['updated_date']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated task.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in task.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

