import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.incident import (
    save_new_incident,
    get_all_incidents,
    get_a_incident,
    update_a_incident,
    delete_a_incident,
)
from ..service.reporter import save_new_reporter
from ..service.event import save_new_event, get_incident_events, get_trail_events
from ..service.incident_entity import get_incident_entities
from ..service.incident_outcome import get_incident_outcomes
from ..service.incident_status import save_new_incident_status
from ..service.incident_severity import save_new_incident_severity

from .. import api

from ..model.event import EventAction, AffectedAttribute
from ..model.incident_status import StatusType
from ..model.incident_severity import SeverityLevel
from ..model.occurence import Occurence

from ..util.request_helper import get_user_permissions

incident_fields = {
    "id": fields.Integer,
    "token": fields.String(1024),
    "election_id": fields.Integer,
    "reporter_id": fields.Integer,

    "occurence": fields.String(1024),

    "category": fields.Integer,

    "district_id": fields.Integer,
    "ward_id": fields.Integer,
    "police_station_id": fields.Integer,
    "polling_station_id": fields.Integer,
    "location": fields.String(4096),
    "address": fields.String(4096),
    "coordinates": fields.String(4096),


    "channel": fields.String(4096),
    "timing_nature": fields.String(1024),
    "validity": fields.String(1024),
    
    "title": fields.String,
    "description": fields.String,
    "sn_title": fields.String,
    "sn_description": fields.String,
    "tm_title": fields.String,
    "tm_description": fields.String,

    "created_date": fields.Integer,
    "updated_date": fields.Integer,
}

incident_list_fields = {"incidents": fields.List(fields.Nested(incident_fields))}


@api.resource("/incidents")
class IncidentList(Resource):
    @marshal_with(incident_fields)
    def get(self):
        """List all registered incidents"""
        permissions = get_user_permissions(request)
        print (permissions)
        return get_all_incidents()

    def post(self):
        """Creates a new Incident """
        incident_data = request.get_json()

        reporter = save_new_reporter({})

        incident_data["reporter_id"] = reporter.id

        occurence = None
        try:
            occurence = Occurence[incident_data['occurence']]
        except:
            pass
        
        incident_data['occurence'] = occurence
        # first save he incident
        incident = save_new_incident(incident_data)

        # create the status for incident
        status = save_new_incident_status(
            dict(incident_id=incident.id, status_type=StatusType.NEW)
        )

        # create the default severity for incident
        severity = save_new_incident_severity(
            dict(incident_id=incident.id, level=SeverityLevel.DEFAULT)
        )

        # update incident with the status flag
        update_a_incident(
            incident.id, dict(current_status=status.id, current_severity=severity.id)
        )

        event_data = {
            "action": EventAction.CREATED,
            "incident_id": incident.id,
            "intiator": "ANON",
        }
        save_new_event(event_data)

        return {
            "incident": incident.to_dict(), 
            "reporter": reporter.to_dict()
        }, 200


@api.resource("/incidents/<id>")
class Incident(Resource):
    def get(self, id):
        """get a incident given its identifier"""
        incident = get_a_incident(id)
        if not incident:
            api.abort(404)
        else:
            return incident.to_dict()

    def put(self, id):
        """Update a given Incident """
        data = request.get_json()
        incident = update_a_incident(id=id, data=data)

        event_data = {
            "action": EventAction.GENERIC_UPDATE,
            "incident_id": id,
            "intiator": "ANON",
        }
        save_new_event(event_data)

        return incident.to_dict(), 200

    def delete(self, id):
        """Delete a given Incident """
        return delete_a_incident(id)


@api.resource("/incident/<incident_id>/events")
class IncidentEvents(Resource):
    @marshal_with({
        "id": fields.String,
        "action": fields.String(default=None),
        "reference_id": fields.Integer(default=None),
        "linked_event": fields.String,
        "description": fields.String,
        "intiator": fields.String,
        "incident_id": fields.Integer,
        "affected_attribute": fields.String,
        "created_date": fields.Integer,
        "approved_date": fields.Integer(default=None),
        "data": fields.Raw(default=None)
    })
    def get(self, incident_id):
        """get all events of an incident in the chronological order"""
        print(get_incident_events(incident_id)[0].__dict__)

        return get_trail_events(incident_id)

@api.resource("/incident/<incident_id>/entitys")
class IncidentEntities(Resource):
    @marshal_with(incident_fields)
    def get(self, incident_id):
        """get all entities related to the incident"""
        return get_incident_entities(incident_id)

@api.resource("/incident/<incident_id>/outcomes")
class IncidentOutcomes(Resource):
    @marshal_with(incident_fields)
    def get(self, incident_id):
        """get all entities related to the incident"""
        return get_incident_outcomes(incident_id)

@api.resource("/incident/<incident_id>/status")
class Status(Resource):
    def post(self, incident_id):
        """change the current status of the incident"""
        data = request.get_json()

        status_type = None
        try:
            status_type = StatusType[data['status_type']]
        except:
            pass

        # create a new status flag
        status = save_new_incident_status(
            dict(incident_id=incident_id, status_type=status_type)
        )

        # update incident with the status flag
        update_a_incident(
            incident_id, dict(current_status=status.id)
        )

        event_data = {
            "action": EventAction.ATTRIBUTE_CHANGED,
            "incident_id": incident_id,
            'reference_id': status.id,
            "intiator": "ANON",
            "affected_attribute": AffectedAttribute.STATUS
        }
        save_new_event(event_data)

        return {"status": "SUCCESS", "message": "Updated succesfully!"}, 200

@api.resource("/incident/<incident_id>/severity")
class Severity(Resource):
    def post(self, incident_id):
        """change the current severity of the incident"""
        data = request.get_json()

        level = None
        try:
            level = SeverityLevel[data['level']]
        except:
            pass

        # create the default severity for incident
        severity = save_new_incident_severity(
            dict(incident_id=incident_id, level=level)
        )

        # update incident with the status flag
        update_a_incident(
            incident_id, dict(current_severity=severity.id)
        )

        event_data = {
            "action": EventAction.ATTRIBUTE_CHANGED,
            "incident_id": incident_id,
            'reference_id': severity.id,
            "intiator": "ANON",
            "affected_attribute": AffectedAttribute.SEVERITY
        }
        save_new_event(event_data)

        return {"status": "SUCCESS", "message": "Updated succesfully!"}, 200