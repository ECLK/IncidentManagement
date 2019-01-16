import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.election import save_new_election, get_all_elections, get_a_election, update_a_election, delete_a_election

from .. import api

election_fields = {
    
    'id' : fields.Integer,
    'name' : fields.String(1024),
    'sn_name' : fields.String(1024),
    'tm_name' : fields.String(1024),
}

election_list_fields = {
    'elections': fields.List(fields.Nested(election_fields))
}

@api.resource('/elections')
class ElectionList(Resource):
    @marshal_with(election_fields)
    def get(self):
        """List all registered elections"""
        return get_all_elections()

    def post(self):
        """Creates a new Election """
        data = request.get_json()
        return save_new_election(data=data)


@api.resource('/elections/<id>')
class Election(Resource):
    @marshal_with(election_fields)
    def get(self, id):
        """get a election given its identifier"""
        election = get_a_election(id)
        if not election:
            api.abort(404)
        else:
            return election

    def put(self, id):
        """Update a given Election """
        data = request.get_json()
        return update_a_election(id=id, data=data)

    def delete(self, id):
        """Delete a given Election """
        return delete_a_election(id)