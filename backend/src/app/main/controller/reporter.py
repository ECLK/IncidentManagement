import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.reporter import save_new_reporter, get_all_reporters, get_a_reporter, update_a_reporter, delete_a_reporter

from .. import api

reporter_fields = {
    
    'id' : fields.Integer,
    'name' : fields.String(1024),
    'sn_name' : fields.String(1024),
    'tm_name' : fields.String(1024),
    'type' : fields.String(1024),
}

reporter_list_fields = {
    'reporters': fields.List(fields.Nested(reporter_fields))
}

@api.resource('/reporters')
class ReporterList(Resource):
    @marshal_with(reporter_fields)
    def get(self):
        """List all registered reporters"""
        return get_all_reporters()

    def post(self):
        """Creates a new Reporter """
        data = request.get_json()
        return save_new_reporter(data=data)


@api.resource('/reporters/<id>')
class Reporter(Resource):
    @marshal_with(reporter_fields)
    def get(self, id):
        """get a reporter given its identifier"""
        reporter = get_a_reporter(id)
        if not reporter:
            api.abort(404)
        else:
            return reporter

    def put(self, id):
        """Update a given Reporter """
        data = request.get_json()
        return update_a_reporter(id=id, data=data)

    def delete(self, id):
        """Delete a given Reporter """
        return delete_a_reporter(id)