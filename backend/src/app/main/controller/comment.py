import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.comment import save_new_comment, get_all_comments, get_a_comment, update_a_comment, delete_a_comment

from .. import api

comment_fields = {
    'id' : fields.Integer,
    'body' : fields.String,
    'sn_body' : fields.String,
    'tm_body' : fields.String,
    'user_id' : fields.Integer,
    'role_id' : fields.Integer,
}

comment_list_fields = {
    'comments': fields.List(fields.Nested(comment_fields))
}

@api.resource('/comments')
class CommentList(Resource):
    @marshal_with(comment_fields)
    def get(self):
        """List all registered comments"""
        return get_all_comments()

    def post(self):
        """Creates a new Comment """
        data = request.get_json()
        return save_new_comment(data=data)


@api.resource('/comments/<id>')
class Comment(Resource):
    @marshal_with(comment_fields)
    def get(self, id):
        """get a comment given its identifier"""
        comment = get_a_comment(id)
        if not comment:
            api.abort(404)
        else:
            return comment

    def put(self, id):
        """Update a given Comment """
        data = request.get_json()
        return update_a_comment(id=id, data=data)

    def delete(self, id):
        """Delete a given Comment """
        return delete_a_comment(id)
