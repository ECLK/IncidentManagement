import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.incident_status import save_new_incident_status, get_all_incident_statuss, get_a_incident_status, update_a_incident_status, delete_a_incident_status

from .. import api

incident_status_fields = {
    
    'id' : fields.Integer,
    'name' : fields.String(1024),
    'detail' : fields.String,
    'incident_id' : fields.Integer,
    'executed_at' : fields.DateTime,
}

incident_status_list_fields = {
    'incident_statuss': fields.List(fields.Nested(incident_status_fields))
}

@api.resource('/incident_statuss')
class IncidentStatusList(Resource):
    @marshal_with(incident_status_fields)
    def get(self):
        """List all registered incident_statuss"""
        return get_all_incident_statuss()

    def post(self):
        """Creates a new IncidentStatus """
        data = request.get_json()
        return save_new_incident_status(data=data)


@api.resource('/incident_statuss/<id>')
class IncidentStatus(Resource):
    @marshal_with(incident_status_fields)
    def get(self, id):
        """get a incident_status given its identifier"""
        incident_status = get_a_incident_status(id)
        if not incident_status:
            api.abort(404)
        else:
            return incident_status

    def put(self, id):
        """Update a given IncidentStatus """
        data = request.get_json()
        return update_a_incident_status(id=id, data=data)

    def delete(self, id):
        """Delete a given IncidentStatus """
        return delete_a_incident_status(id)