from flask import Flask

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.state_service import save_new_state, get_all_states, get_a_state

from .. import api

state_fields = {
    'id': fields.Integer,
    'name': fields.String
}

state_list_fields = {
    'states': fields.List(fields.Nested(state_fields))
}

@api.resource('/states')
class StateList(Resource):
    @marshal_with(state_fields)
    def get(self):
        """List all registered states"""
        return get_all_states()

    def post(self):
        """Creates a new State """
        data = request.get_json()
        return save_new_state(data=data)


@api.resource('/states/<id>')
class State(Resource):
    @marshal_with(state_fields)
    def get(self, id):
        """get a state given its identifier"""
        state = get_a_state(id)
        if not state:
            api.abort(404)
        else:
            return state

