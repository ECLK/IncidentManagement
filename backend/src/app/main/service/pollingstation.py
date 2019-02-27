import datetime

from app.main import db
from app.main.model.pollingstation import PollingStation


def save_new_pollingstation(data):
    new_pollingstation = PollingStation()
    try:
        new_pollingstation.district_id = data['district_id']
    except KeyError:
        pass
    try:
        new_pollingstation.name = data['name']
    except KeyError:
        pass
    try:
        new_pollingstation.division = data['division']
    except KeyError:
        pass
    try:
        new_pollingstation.sn_name = data['sn_name']
    except KeyError:
        pass
    try:
        new_pollingstation.sn_division = data['sn_division']
    except KeyError:
        pass
    try:
        new_pollingstation.tm_name = data['tm_name']
    except KeyError:
        pass
    try:
        new_pollingstation.tm_division = data['tm_division']
    except KeyError:
        pass
    
    save_changes(new_pollingstation)
    response_object = {
        'status': 'success',
        'message': 'Successfully created pollingstation.',
    }
    return response_object, 201

def get_all_pollingstations():
    return PollingStation.query.all()

def get_a_pollingstation(id):
    return PollingStation.query.filter_by(id=id).first()

def delete_a_pollingstation(id):
    pollingstation = PollingStation.query.filter_by(id=id).first()
    if not pollingstation:
        response_object = {
            'status': 'fail',
            'message': 'PollingStation with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(pollingstation)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted pollingstation with id ' + id + '.',
        }
        return response_object, 201

def update_a_pollingstation(id, data):
    pollingstation = PollingStation.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        pollingstation.district_id = data['district_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        pollingstation.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        pollingstation.division = data['division']
        status = SUCESS
    except KeyError:
        pass
    try:
        pollingstation.sn_name = data['sn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        pollingstation.sn_division = data['sn_division']
        status = SUCESS
    except KeyError:
        pass
    try:
        pollingstation.tm_name = data['tm_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        pollingstation.tm_division = data['tm_division']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated pollingstation.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in pollingstation.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

