import datetime

from app.main import db
from app.main.model.district import District


def save_new_district(data):
    new_district = District()
    try:
        new_district.name = data['name'],
    except KeyError:
        pass
    try:
        new_district.province = data['province'],
    except KeyError:
        pass
    try:
        new_district.sn_name = data['sn_name'],
    except KeyError:
        pass
    try:
        new_district.sn_province = data['sn_province'],
    except KeyError:
        pass
    try:
        new_district.tm_name = data['tm_name'],
    except KeyError:
        pass
    try:
        new_district.tm_province = data['tm_province'],
    except KeyError:
        pass
    
    save_changes(new_district)
    response_object = {
        'status': 'success',
        'message': 'Successfully created district.',
    }
    return response_object, 201

def get_all_districts():
    return District.query.all()

def get_a_district(id):
    return District.query.filter_by(id=id).first()

def delete_a_district(id):
    district = District.query.filter_by(id=id).first()
    if not district:
        response_object = {
            'status': 'fail',
            'message': 'District with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(district)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted district with id ' + id + '.',
        }
        return response_object, 201

def update_a_district(id, data):
    district = District.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        district.name = data['name']
        status = SUCESS
    except KeyError:
        pass
    try:
        district.province = data['province']
        status = SUCESS
    except KeyError:
        pass
    try:
        district.sn_name = data['sn_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        district.sn_province = data['sn_province']
        status = SUCESS
    except KeyError:
        pass
    try:
        district.tm_name = data['tm_name']
        status = SUCESS
    except KeyError:
        pass
    try:
        district.tm_province = data['tm_province']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated district.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in district.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

