import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.incident_relation import save_new_incident_relation, get_all_incident_relations, get_a_incident_relation, update_a_incident_relation, delete_a_incident_relation

from .. import api

incident_relation_fields = {
    
    'id' : fields.Integer,
    'incident1_id' : fields.Integer,
    'incident2_id' : fields.Integer,
    'relationship' : fields.String,
    'description' : fields.String,
    'sn_description' : fields.String,
    'tn_description' : fields.String,
    'created_date' : fields.DateTime,
}

incident_relation_list_fields = {
    'incident_relations': fields.List(fields.Nested(incident_relation_fields))
}

@api.resource('/incident_relations')
class IncidentRelationList(Resource):
    @marshal_with(incident_relation_fields)
    def get(self):
        """List all registered incident_relations"""
        return get_all_incident_relations()

    def post(self):
        """Creates a new IncidentRelation """
        data = request.get_json()
        return save_new_incident_relation(data=data)


@api.resource('/incident_relations/<id>')
class IncidentRelation(Resource):
    @marshal_with(incident_relation_fields)
    def get(self, id):
        """get a incident_relation given its identifier"""
        incident_relation = get_a_incident_relation(id)
        if not incident_relation:
            api.abort(404)
        else:
            return incident_relation

    def put(self, id):
        """Update a given IncidentRelation """
        data = request.get_json()
        return update_a_incident_relation(id=id, data=data)

    def delete(self, id):
        """Delete a given IncidentRelation """
        return delete_a_incident_relation(id)