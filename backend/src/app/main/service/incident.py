import datetime

from app.main import db
from app.main.model.incident import Incident


def save_new_incident(data):
    new_incident = Incident()
    try:
        new_incident.token = data['token']
    except KeyError:
        pass
    try:
        new_incident.election_id = data['election_id']
    except KeyError:
        pass
    try:
        new_incident.police_station_id = data['police_station_id']
    except KeyError:
        pass
    try:
        new_incident.polling_station_id = data['polling_station_id']
    except KeyError:
        pass
    try:
        new_incident.reporter_id = data['reporter_id']
    except KeyError:
        pass
    try:
        new_incident.location = data['location']
    except KeyError:
        pass
    try:
        new_incident.channel = data['channel']
    except KeyError:
        pass
    try:
        new_incident.timing_nature = data['timing_nature']
    except KeyError:
        pass
    try:
        new_incident.validity = data['validity']
    except KeyError:
        pass
    try:
        new_incident.title = data['title']
    except KeyError:
        pass
    try:
        new_incident.description = data['description']
    except KeyError:
        pass
    try:
        new_incident.sn_title = data['sn_title']
    except KeyError:
        pass
    try:
        new_incident.sn_description = data['sn_description']
    except KeyError:
        pass
    try:
        new_incident.tm_title = data['tm_title']
    except KeyError:
        pass
    try:
        new_incident.tm_description = data['tm_description']
    except KeyError:
        pass
    try:
        new_incident.created_date = data['created_date']
    except KeyError:
        pass
    try:
        new_incident.updated_date = data['updated_date']
    except KeyError:
        pass
    
    save_changes(new_incident)

    return new_incident

def get_all_incidents():
    return Incident.query.all()

def get_a_incident(id):
    return Incident.query.filter_by(id=id).first()

def delete_a_incident(id):
    incident = Incident.query.filter_by(id=id).first()
    if not incident:
        response_object = {
            'status': 'fail',
            'message': 'Incident with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(incident)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted incident with id ' + id + '.',
        }
        return response_object, 201

def update_a_incident(id, data):
    incident = Incident.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        incident.token = data['token']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.election_id = data['election_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.police_station_id = data['police_station_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.polling_station_id = data['polling_station_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.title = data['title']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.description = data['description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.sn_title = data['sn_title']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.sn_description = data['sn_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.tm_title = data['tm_title']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.tm_description = data['tm_description']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.occurence = data['occurence']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.reporter_id = data['reporter_id']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.channel = data['channel']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.category = data['category']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.location = data['location']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.timing_nature = data['timing_nature']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.validity = data['validity']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.created_date = data['created_date']
        status = SUCESS
    except KeyError:
        pass
    try:
        incident.updated_date = data['updated_date']
        status = SUCESS
    except KeyError:
        pass
    
    db.session.commit()
    return True

def save_changes(data):
    db.session.add(data)
    db.session.commit()

