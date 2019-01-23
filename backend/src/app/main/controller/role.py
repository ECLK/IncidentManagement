import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.role import save_new_role, get_all_roles, get_a_role, update_a_role, delete_a_role

from .. import api

role_fields = {
    
    'id' : fields.Integer,
    'entiry_id' : fields.Integer,
    'name' : fields.String(1024),
    'sn_name' : fields.String(1024),
    'tm_name' : fields.String(1024),
}

role_list_fields = {
    'roles': fields.List(fields.Nested(role_fields))
}

@api.resource('/roles')
class RoleList(Resource):
    @marshal_with(role_fields)
    def get(self):
        """List all registered roles"""
        return get_all_roles()

    def post(self):
        """Creates a new Role """
        data = request.get_json()
        return save_new_role(data=data)


@api.resource('/roles/<id>')
class Role(Resource):
    @marshal_with(role_fields)
    def get(self, id):
        """get a role given its identifier"""
        role = get_a_role(id)
        if not role:
            api.abort(404)
        else:
            return role

    def put(self, id):
        """Update a given Role """
        data = request.get_json()
        return update_a_role(id=id, data=data)

    def delete(self, id):
        """Delete a given Role """
        return delete_a_role(id)