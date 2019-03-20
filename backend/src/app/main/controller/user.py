import json
import jwt
import enum
from flask import Flask, jsonify
from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with
from .. import api
from ..model.user import PermissionLevel

user_claims = {
    'supervisor'    :   {
                            "id": "123",
                            "name": "supervicor",
                            "permissions": {
                                "status": PermissionLevel.ALLOWED.value,
                                "severity": PermissionLevel.ALLOWED.value
                            }
                        },
    'subordinate'   :  {
                            "id": "456",
                            "name": "subordinate",
                            "permissions": {
                                "status": PermissionLevel.ALLOWED_WITH_APPROVAL.value,
                                "severity": PermissionLevel.ALLOWED_WITH_APPROVAL.value
                            }
                        },
    'anonymous'     :   {
                            "id": "789",
                            "name": "anonymous",
                            "permissions": {
                                "status": PermissionLevel.NOT_ALLOWED.value,
                                "severity": PermissionLevel.NOT_ALLOWED.value
                            }
                        }
}

@api.resource('/users')
class UserList(Resource):
    def get(self):
        """List all registered users"""
        return user_claims, 200

    def post(self):
        data = request.get_json()
        print ('data')
        print (data)
        return 200

@api.resource('/users/<username>')
class User(Resource):
    def get(self, username):
        """get a user token given the username"""
        token = jwt.encode(user_claims[username], 'eclk-incident-management', algorithm='HS256').decode('utf-8')
        return {
                    'user' : username,
                    'token': token
        }, 200
    
