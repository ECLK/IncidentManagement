import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.incident_severity import (
    save_new_incident_severity,
    get_all_incident_severitys,
    get_a_incident_severity
)

from .. import api

incident_severity_fields = {
    "id": fields.Integer,
    "level": fields.String(1024),
    "detail": fields.String,
    "incident_id": fields.Integer,
    "executed_at": fields.DateTime,
}

incident_severity_list_fields = {
    "incident_severitys": fields.List(fields.Nested(incident_severity_fields))
}


@api.resource("/incident_severitys")
class IncidentSeverityList(Resource):
    @marshal_with(incident_severity_fields)
    def get(self):
        """List all registered incident_severitys"""
        return get_all_incident_severitys()

    def post(self):
        """Creates a new IncidentSeverity """
        data = request.get_json()
        return save_new_incident_severity(data=data)


@api.resource("/incident_severitys/<id>")
class IncidentSeverity(Resource):
    @marshal_with(incident_severity_fields)
    def get(self, id):
        """get a incident_severity given its identifier"""
        incident_severity = get_a_incident_severity(id)
        if not incident_severity:
            api.abort(404)
        else:
            return incident_severity

    def put(self, id):
        """Update a given IncidentSeverity """
        data = request.get_json()
        return update_a_incident_severity(id=id, data=data)

    def delete(self, id):
        """Delete a given IncidentSeverity """
        return delete_a_incident_severity(id)
