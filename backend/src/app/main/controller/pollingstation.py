import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.pollingstation import save_new_pollingstation, get_all_pollingstations, get_a_pollingstation, update_a_pollingstation, delete_a_pollingstation

from .. import api

pollingstation_fields = {
    
    'id' : fields.Integer,
    'district_id' : fields.Integer,
    'name' : fields.String(1024),
    'division' : fields.String(1024),
    'sn_name' : fields.String(1024),
    'sn_division' : fields.String(1024),
    'tm_name' : fields.String(1024),
    'tm_division' : fields.String(1024),
}

pollingstation_list_fields = {
    'pollingstations': fields.List(fields.Nested(pollingstation_fields))
}

@api.resource('/pollingstations')
class PollingStationList(Resource):
    @marshal_with(pollingstation_fields)
    def get(self):
        """List all registered pollingstations"""
        return get_all_pollingstations()

    def post(self):
        """Creates a new PollingStation """
        data = request.get_json()
        return save_new_pollingstation(data=data)


@api.resource('/pollingstations/<id>')
class PollingStation(Resource):
    @marshal_with(pollingstation_fields)
    def get(self, id):
        """get a pollingstation given its identifier"""
        pollingstation = get_a_pollingstation(id)
        if not pollingstation:
            api.abort(404)
        else:
            return pollingstation

    def put(self, id):
        """Update a given PollingStation """
        data = request.get_json()
        return update_a_pollingstation(id=id, data=data)

    def delete(self, id):
        """Delete a given PollingStation """
        return delete_a_pollingstation(id)