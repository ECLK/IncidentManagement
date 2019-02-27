import datetime

from app.main import db
from app.main.model.election import Election


def save_new_election(data):
    new_election = Election()
    try:
        new_election.name = data['name']
    except KeyError:
        pass
    try:
        new_election.sn_name = data['sn_name']
    except KeyError:
        pass
    try:
        new_election.tm_name = data['tm_name']
    except KeyError:
        pass
    
    save_changes(new_election)
    response_object = {
        'status': 'success',
        'message': 'Successfully created election.',
    }
    return response_object, 201

def get_all_elections():
    return Election.query.all()

def get_a_election(id):
    return Election.query.filter_by(id=id).first()

def delete_a_election(id):
    election = Election.query.filter_by(id=id).first()
    if not election:
        response_object = {
            'status': 'fail',
            'message': 'Election with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(election)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted election with id ' + id + '.',
        }
        return response_object, 201

def update_a_election(id, data):
    election = Election.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        election.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        election.sn_name = data['sn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        election.tm_name = data['tm_name']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated election.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in election.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

