import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.user import save_new_user, get_all_users, get_a_user, update_a_user, delete_a_user

from .. import api

user_fields = {
    
    'id' : fields.Integer,
    'role_id' : fields.Integer,
    'name' : fields.String(1024),
    'sn_name' : fields.String(1024),
    'tm_name' : fields.String(1024),
}

user_list_fields = {
    'users': fields.List(fields.Nested(user_fields))
}

@api.resource('/users')
class UserList(Resource):
    @marshal_with(user_fields)
    def get(self):
        """List all registered users"""
        return get_all_users()

    def post(self):
        """Creates a new User """
        data = request.get_json()
        return save_new_user(data=data)


@api.resource('/users/<id>')
class User(Resource):
    @marshal_with(user_fields)
    def get(self, id):
        """get a user given its identifier"""
        user = get_a_user(id)
        if not user:
            api.abort(404)
        else:
            return user

    def put(self, id):
        """Update a given User """
        data = request.get_json()
        return update_a_user(id=id, data=data)

    def delete(self, id):
        """Delete a given User """
        return delete_a_user(id)