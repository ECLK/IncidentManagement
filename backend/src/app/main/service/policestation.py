import datetime

from app.main import db
from app.main.model.policestation import PoliceStation


def save_new_policestation(data):
    new_policestation = PoliceStation()
    try:
        new_policestation.district_id = data['district_id'],
    except KeyError:
        pass
    try:
        new_policestation.name = data['name'],
    except KeyError:
        pass
    try:
        new_policestation.division = data['division'],
    except KeyError:
        pass
    try:
        new_policestation.sn_name = data['sn_name'],
    except KeyError:
        pass
    try:
        new_policestation.sn_division = data['sn_division'],
    except KeyError:
        pass
    try:
        new_policestation.tm_name = data['tm_name'],
    except KeyError:
        pass
    try:
        new_policestation.tm_division = data['tm_division'],
    except KeyError:
        pass
    
    save_changes(new_policestation)
    response_object = {
        'status': 'success',
        'message': 'Successfully created policestation.',
    }
    return response_object, 201

def get_all_policestations():
    return PoliceStation.query.all()

def get_a_policestation(id):
    return PoliceStation.query.filter_by(id=id).first()

def delete_a_policestation(id):
    policestation = PoliceStation.query.filter_by(id=id).first()
    if not policestation:
        response_object = {
            'status': 'fail',
            'message': 'PoliceStation with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(policestation)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted policestation with id ' + id + '.',
        }
        return response_object, 201

def update_a_policestation(id, data):
    policestation = PoliceStation.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        policestation.district_id = data['district_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        policestation.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        policestation.division = data['division']
        status = SUCESS
    except KeyError:
        pass
    try:
        policestation.sn_name = data['sn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        policestation.sn_division = data['sn_division']
        status = SUCESS
    except KeyError:
        pass
    try:
        policestation.tm_name = data['tm_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        policestation.tm_division = data['tm_division']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated policestation.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in policestation.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

