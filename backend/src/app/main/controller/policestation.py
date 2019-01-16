import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.policestation import save_new_policestation, get_all_policestations, get_a_policestation, update_a_policestation, delete_a_policestation

from .. import api

policestation_fields = {
    
    'id' : fields.Integer,
    'district_id' : fields.Integer,
    'name' : fields.String(1024),
    'division' : fields.String(1024),
    'sn_name' : fields.String(1024),
    'sn_division' : fields.String(1024),
    'tm_name' : fields.String(1024),
    'tm_division' : fields.String(1024),
}

policestation_list_fields = {
    'policestations': fields.List(fields.Nested(policestation_fields))
}

@api.resource('/policestations')
class PoliceStationList(Resource):
    @marshal_with(policestation_fields)
    def get(self):
        """List all registered policestations"""
        return get_all_policestations()

    def post(self):
        """Creates a new PoliceStation """
        data = request.get_json()
        return save_new_policestation(data=data)


@api.resource('/policestations/<id>')
class PoliceStation(Resource):
    @marshal_with(policestation_fields)
    def get(self, id):
        """get a policestation given its identifier"""
        policestation = get_a_policestation(id)
        if not policestation:
            api.abort(404)
        else:
            return policestation

    def put(self, id):
        """Update a given PoliceStation """
        data = request.get_json()
        return update_a_policestation(id=id, data=data)

    def delete(self, id):
        """Delete a given PoliceStation """
        return delete_a_policestation(id)