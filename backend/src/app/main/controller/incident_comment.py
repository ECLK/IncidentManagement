import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.incident_comment import save_new_incident_comment, get_all_incident_comments, get_a_incident_comment, update_a_incident_comment, delete_a_incident_comment

from ..service.event import save_new_event, get_incident_events
from ..model.event import EventAction

from .. import api

incident_comment_fields = {
    
    'id' : fields.Integer,
    'name' : fields.String(1024),
    'body' : fields.String,
    'sn_body' : fields.String,
    'tm_body' : fields.String,
    'incident_id' : fields.Integer,
    'user_id' : fields.Integer,
    'role_id' : fields.Integer,
    'is_active' : fields.Boolean,
    'created_date' : fields.Integer,
    'updated_date' : fields.Integer,
    'deleted_date' : fields.Integer,
}

incident_comment_list_fields = {
    'incident_comments': fields.List(fields.Nested(incident_comment_fields))
}

@api.resource('/incident_comments')
class IncidentCommentList(Resource):
    @marshal_with(incident_comment_fields)
    def get(self):
        """List all registered incident_comments"""
        return get_all_incident_comments()

    def post(self):
        """Creates a new IncidentComment """
        data = request.get_json()
        new_incident_comment = save_new_incident_comment(data=data)


        event_data = {
            "action": EventAction.COMMENTED,
            "reference_id": new_incident_comment.id,
            "intiator": new_incident_comment.user_id,
            "incident_id": new_incident_comment.incident_id
        }
        save_new_event(event_data)
        return {
            "id": new_incident_comment.id
        }, 200


@api.resource('/incident_comments/<id>')
class IncidentComment(Resource):
    @marshal_with(incident_comment_fields)
    def get(self, id):
        """get a incident_comment given its identifier"""
        incident_comment = get_a_incident_comment(id)
        if not incident_comment:
            api.abort(404)
        else:
            return incident_comment

    def put(self, id):
        """Update a given IncidentComment """
        data = request.get_json()
        return update_a_incident_comment(id=id, data=data)

    def delete(self, id):
        """Delete a given IncidentComment """
        return delete_a_incident_comment(id)
