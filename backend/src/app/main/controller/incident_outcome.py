import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.incident_outcome import save_new_incident_outcome, get_all_incident_outcomes, get_a_incident_outcome, update_a_incident_outcome, delete_a_incident_outcome

from .. import api

from ..service.event import save_new_event
from ..model.event import EventAction

incident_outcome_fields = {
    
    'id' : fields.Integer,
    'incident_id' : fields.Integer,
    'type' : fields.String(1024),
    'title' : fields.String(1024),
    'sn_title' : fields.String(1024),
    'tm_title' : fields.String(1024),
    'description' : fields.String,
    'sn_description' : fields.String,
    'tn_description' : fields.String,
    'created_date' : fields.DateTime,
}

incident_outcome_list_fields = {
    'incident_outcomes': fields.List(fields.Nested(incident_outcome_fields))
}

@api.resource('/incident_outcomes')
class IncidentOutcomeList(Resource):
    @marshal_with(incident_outcome_fields)
    def get(self):
        """List all registered incident_outcomes"""
        return get_all_incident_outcomes()

    def post(self):
        """Creates a new IncidentOutcome """
        data = request.get_json()
        outcome = save_new_incident_outcome(data=data)

        event_data = {
            "action": EventAction.ATTRIBUTE_CHANGED,
            "incident_id": outcome.incident_id,
            "reference_id": outcome.id,
            "intiator": "ANON",
        }
        save_new_event(event_data)

        return {
            "incident_outcome_id": outcome.id
        }, 200


@api.resource('/incident_outcomes/<id>')
class IncidentOutcome(Resource):
    @marshal_with(incident_outcome_fields)
    def get(self, id):
        """get a incident_outcome given its identifier"""
        incident_outcome = get_a_incident_outcome(id)
        if not incident_outcome:
            api.abort(404)
        else:
            return incident_outcome

    def put(self, id):
        """Update a given IncidentOutcome """
        data = request.get_json()
        return update_a_incident_outcome(id=id, data=data)

    def delete(self, id):
        """Delete a given IncidentOutcome """
        return delete_a_incident_outcome(id)