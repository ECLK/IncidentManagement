from flask import Flask

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.user_service import save_new_user, get_all_users, get_a_user, delete_a_user

from .. import api

user_fields = {
    'id': fields.Integer,
    'name': fields.String
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

    def delete(self, id):
        return delete_a_user(id)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

def set_routes():
    api.add_resource(HelloWorld, '/hello')
    print("api.add_resource")
