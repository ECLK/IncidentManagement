import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.event import save_new_event, get_an_event

from .. import api

from ..model.event import EventAction

incident_fields = {
    
    'id' : fields.Integer,
    'token' : fields.String(1024),
    'election_id' : fields.Integer,
    'police_station_id' : fields.Integer,
    'polling_station_id' : fields.Integer,
    'reporter_id' : fields.Integer,
    'location' : fields.String(4096),
    'channel' : fields.String(4096),
    'timing_nature' : fields.String(1024),
    'validity' : fields.String(1024),
    'title' : fields.String,
    'description' : fields.String,
    'sn_title' : fields.String,
    'sn_description' : fields.String,
    'tm_title' : fields.String,
    'tm_description' : fields.String,
    'created_date' : fields.DateTime,
    'updated_date' : fields.DateTime,
}

incident_list_fields = {
    'incidents': fields.List(fields.Nested(incident_fields))
}

@api.resource('/events/<id>')
class Event(Resource):
    @marshal_with(incident_fields)
    def get(self, id):
        """get an event based on id"""
        event = get_an_event(id)
        if not event:
            api.abort(404)
        else:
            return event