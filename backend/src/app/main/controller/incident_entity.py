import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.incident_entity import save_new_incident_entity, get_all_incident_entitys, get_a_incident_entity, update_a_incident_entity, delete_a_incident_entity

from .. import api

incident_entity_fields = {
    
    'id' : fields.Integer,
    'name' : fields.String(1024),
    'description' : fields.String,
    'incident_id' : fields.Integer,
    'entity_id' : fields.Integer,
    'created_date' : fields.DateTime,
}

incident_entity_list_fields = {
    'incident_entitys': fields.List(fields.Nested(incident_entity_fields))
}

@api.resource('/incident_entitys')
class IncidentEntityList(Resource):
    @marshal_with(incident_entity_fields)
    def get(self):
        """List all registered incident_entitys"""
        return get_all_incident_entitys()

    def post(self):
        """Creates a new IncidentEntity """
        data = request.get_json()
        return save_new_incident_entity(data=data)


@api.resource('/incident_entitys/<id>')
class IncidentEntity(Resource):
    @marshal_with(incident_entity_fields)
    def get(self, id):
        """get a incident_entity given its identifier"""
        incident_entity = get_a_incident_entity(id)
        if not incident_entity:
            api.abort(404)
        else:
            return incident_entity

    def put(self, id):
        """Update a given IncidentEntity """
        data = request.get_json()
        return update_a_incident_entity(id=id, data=data)

    def delete(self, id):
        """Delete a given IncidentEntity """
        return delete_a_incident_entity(id)