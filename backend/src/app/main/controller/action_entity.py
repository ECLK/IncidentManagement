import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.action_entity import save_new_action_entity, get_all_action_entitys, get_a_action_entity, update_a_action_entity, delete_a_action_entity

from .. import api

action_entity_fields = {
    
    'id' : fields.Integer,
    'type' : fields.String(1024),
    'category' : fields.String(1024),
    'name' : fields.String(1024),
    'description' : fields.String,
    'sn_name' : fields.String(1024),
    'sn_description' : fields.String,
    'tn_name' : fields.String(1024),
    'tn_description' : fields.String,
}

action_entity_list_fields = {
    'action_entitys': fields.List(fields.Nested(action_entity_fields))
}

@api.resource('/action_entitys')
class ActionEntityList(Resource):
    @marshal_with(action_entity_fields)
    def get(self):
        """List all registered action_entitys"""
        return get_all_action_entitys()

    def post(self):
        """Creates a new ActionEntity """
        data = request.get_json()
        return save_new_action_entity(data=data)


@api.resource('/action_entitys/<id>')
class ActionEntity(Resource):
    @marshal_with(action_entity_fields)
    def get(self, id):
        """get a action_entity given its identifier"""
        action_entity = get_a_action_entity(id)
        if not action_entity:
            api.abort(404)
        else:
            return action_entity

    def put(self, id):
        """Update a given ActionEntity """
        data = request.get_json()
        return update_a_action_entity(id=id, data=data)

    def delete(self, id):
        """Delete a given ActionEntity """
        return delete_a_action_entity(id)