import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.district import save_new_district, get_all_districts, get_a_district, update_a_district, delete_a_district

from .. import api

district_fields = {
    
    'id' : fields.Integer,
    'name' : fields.String(1024),
    'province' : fields.String(1024),
    'sn_name' : fields.String(1024),
    'sn_province' : fields.String(1024),
    'tm_name' : fields.String(1024),
    'tm_province' : fields.String(1024),
}

district_list_fields = {
    'districts': fields.List(fields.Nested(district_fields))
}

@api.resource('/districts')
class DistrictList(Resource):
    @marshal_with(district_fields)
    def get(self):
        """List all registered districts"""
        return get_all_districts()

    def post(self):
        """Creates a new District """
        data = request.get_json()
        return save_new_district(data=data)


@api.resource('/districts/<id>')
class District(Resource):
    @marshal_with(district_fields)
    def get(self, id):
        """get a district given its identifier"""
        district = get_a_district(id)
        if not district:
            api.abort(404)
        else:
            return district

    def put(self, id):
        """Update a given District """
        data = request.get_json()
        return update_a_district(id=id, data=data)

    def delete(self, id):
        """Delete a given District """
        return delete_a_district(id)