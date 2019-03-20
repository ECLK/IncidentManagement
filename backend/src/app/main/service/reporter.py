import datetime

from app.main import db
from app.main.model.reporter import Reporter


def save_new_reporter(data):
    new_reporter = Reporter()
    try:
        new_reporter.name = data['name']
    except KeyError:
        pass
    try:
        new_reporter.sn_name = data['sn_name']
    except KeyError:
        pass
    try:
        new_reporter.tm_name = data['tm_name']
    except KeyError:
        pass
    try:
        new_reporter.type = data['type']
    except KeyError:
        pass
    
    save_changes(new_reporter)
    
    return new_reporter

def get_all_reporters():
    return Reporter.query.all()

def get_a_reporter(id):
    return Reporter.query.filter_by(id=id).first()

def delete_a_reporter(id):
    reporter = Reporter.query.filter_by(id=id).first()
    if not reporter:
        response_object = {
            'status': 'fail',
            'message': 'Reporter with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(reporter)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted reporter with id ' + id + '.',
        }
        return response_object, 201

def update_a_reporter(id, data):
    reporter = Reporter.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        reporter.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        reporter.sn_name = data['sn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        reporter.tm_name = data['tm_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        reporter.type = data['type']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated reporter.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in reporter.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

