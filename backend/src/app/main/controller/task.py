import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.task import save_new_task, get_all_tasks, get_a_task, update_a_task, delete_a_task

from .. import api

task_fields = {
    
    'id' : fields.Integer,
    'description' : fields.String,
    'state_id' : fields.Integer,
    'owner_id' : fields.Integer,
    'created_date' : fields.DateTime,
    'updated_date' : fields.DateTime,
}

task_list_fields = {
    'tasks': fields.List(fields.Nested(task_fields))
}

@api.resource('/tasks')
class TaskList(Resource):
    @marshal_with(task_fields)
    def get(self):
        """List all registered tasks"""
        return get_all_tasks()

    def post(self):
        """Creates a new Task """
        data = request.get_json()
        return save_new_task(data=data)


@api.resource('/tasks/<id>')
class Task(Resource):
    @marshal_with(task_fields)
    def get(self, id):
        """get a task given its identifier"""
        task = get_a_task(id)
        if not task:
            api.abort(404)
        else:
            return task

    def put(self, id):
        """Update a given Task """
        data = request.get_json()
        return update_a_task(id=id, data=data)

    def delete(self, id):
        """Delete a given Task """
        return delete_a_task(id)