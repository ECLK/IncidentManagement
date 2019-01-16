import json
from flask import Flask, jsonify

from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with

from ..service.category import save_new_category, get_all_categorys, get_a_category, update_a_category, delete_a_category

from .. import api

category_fields = {
    
    'id' : fields.Integer,
    'top_category' : fields.String(1024),
    'sub_category' : fields.String(1024),
    'sn_top_category' : fields.String(1024),
    'sn_sub_category' : fields.String(1024),
    'tm_top_category' : fields.String(1024),
    'tm_sub_category' : fields.String(1024),
}

category_list_fields = {
    'categorys': fields.List(fields.Nested(category_fields))
}

@api.resource('/categorys')
class CategoryList(Resource):
    @marshal_with(category_fields)
    def get(self):
        """List all registered categorys"""
        return get_all_categorys()

    def post(self):
        """Creates a new Category """
        data = request.get_json()
        return save_new_category(data=data)


@api.resource('/categorys/<id>')
class Category(Resource):
    @marshal_with(category_fields)
    def get(self, id):
        """get a category given its identifier"""
        category = get_a_category(id)
        if not category:
            api.abort(404)
        else:
            return category

    def put(self, id):
        """Update a given Category """
        data = request.get_json()
        return update_a_category(id=id, data=data)

    def delete(self, id):
        """Delete a given Category """
        return delete_a_category(id)