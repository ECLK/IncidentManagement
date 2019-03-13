import datetime

from app.main import db
from app.main.model.incident_severity import IncidentSeverity


def save_new_incident_severity(data):
    new_incident_severity = IncidentSeverity()

    try:
        new_incident_severity.level = data["level"]
    except KeyError:
        pass
    try:
        new_incident_severity.incident_id = data["incident_id"]
    except KeyError:
        pass

    save_changes(new_incident_severity)
    return new_incident_severity


def get_all_incident_severitys():
    return IncidentSeverity.query.all()


def get_a_incident_severity(id):
    return IncidentSeverity.query.filter_by(id=id).first()


def delete_a_incident_severity(id):
    incident_severity = IncidentSeverity.query.filter_by(id=id).first()
    if not incident_severity:
        response_object = {
            "status": "fail",
            "message": "IncidentSeverity with id " + id + " does not exists.",
        }
        return response_object, 409
    else:
        db.session.delete(incident_severity)
        db.session.commit()
        response_object = {
            "status": "success",
            "message": "Successfully deleted incident_severity with id " + id + ".",
        }
        return response_object, 201


def save_changes(data):
    db.session.add(data)
    db.session.commit()

