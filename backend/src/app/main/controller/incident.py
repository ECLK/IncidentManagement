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
from ..service.event import save_new_event, get_incident_events
from ..service.incident_entity import get_incident_entities
from ..service.incident_outcome import get_incident_outcomes
from ..service.incident_status import save_new_incident_status
from ..service.incident_severity import save_new_incident_severity

from .. import api

from ..model.event import EventAction
from ..model.incident_status import StatusType
from ..model.incident_severity import SeverityLevel

incident_fields = {
    "id": fields.Integer,
    "token": fields.String(1024),
    "election_id": fields.Integer,
    "category": fields.Integer,
    "police_station_id": fields.Integer,
    "polling_station_id": fields.Integer,
    "reporter_id": fields.Integer,
    "location": fields.String(4096),
    "channel": fields.String(4096),
    "timing_nature": fields.String(1024),
    "validity": fields.String(1024),
    "title": fields.String,
    "description": fields.String,
    "sn_title": fields.String,
    "sn_description": fields.String,
    "tm_title": fields.String,
    "tm_description": fields.String,
    "created_date": fields.DateTime,
    "updated_date": fields.DateTime,
}

incident_list_fields = {"incidents": fields.List(fields.Nested(incident_fields))}


@api.resource("/incidents")
class IncidentList(Resource):
    @marshal_with(incident_fields)
    def get(self):
        """List all registered incidents"""
        return get_all_incidents()

    def post(self):
        """Creates a new Incident """
        incident_data = request.get_json()

        reporter = save_new_reporter({})

        incident_data["reporter_id"] = reporter.id

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

        return {"incident_id": incident.id, "reporter_id": reporter.id}, 200


@api.resource("/incidents/<id>")
class Incident(Resource):
    @marshal_with(incident_fields)
    def get(self, id):
        """get a incident given its identifier"""
        incident = get_a_incident(id)
        if not incident:
            api.abort(404)
        else:
            return incident

    def put(self, id):
        """Update a given Incident """
        data = request.get_json()
        update_a_incident(id=id, data=data)

        event_data = {
            "action": EventAction.GENERIC_UPDATE,
            "incident_id": id,
            "intiator": "ANON",
        }
        save_new_event(event_data)

        return {"status": "SUCCESS", "message": "Updated succesfully!"}, 200

    def delete(self, id):
        """Delete a given Incident """
        return delete_a_incident(id)


@api.resource("/incident/<id>/events")
class Events(Resource):
    @marshal_with(incident_fields)
    def get(self, incident_id):
        """get all events of an incident in the chronological order"""
        return get_incident_events(incident_id)


@api.resource("/incident/<id>/entitys")
class IncidentEntities(Resource):
    @marshal_with(incident_fields)
    def get(self, incident_id):
        """get all entities related to the incident"""
        return get_incident_entities(incident_id)


@api.resource("/incident/<id>/outcomes")
class IncidentOutcomes(Resource):
    @marshal_with(incident_fields)
    def get(self, incident_id):
        """get all entities related to the incident"""
        return get_incident_outcomes(incident_id)
