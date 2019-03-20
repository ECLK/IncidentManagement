import json
import jwt
import enum
from flask import Flask, jsonify
from flask_restful import reqparse, abort, Api, Resource, request, fields, marshal_with
from .. import api

class PermissionLevel(enum.Enum):
    NOT_ALLOWED = 1  
    ALLOWED_WITH_APPROVAL = 2
    ALLOWED = 3

user_claims = {
    'supervisor'    :   {
                            "id": "123",
                            "name": "supervicor",
                            "permissions": {
                                "status_change": PermissionLevel.ALLOWED.value,
                                "severity_change": PermissionLevel.ALLOWED.value
                            }
                        },
    'subordinate'   :  {
                            "id": "123",
                            "name": "subordinate",
                            "permissions": {
                                "status_change": PermissionLevel.ALLOWED_WITH_APPROVAL.value,
                                "severity_change": PermissionLevel.ALLOWED_WITH_APPROVAL.value
                            }
                        },
    'anonymous'     :   {
                            "id": "123",
                            "name": "anonymous",
                            "permissions": {
                                "status_change": PermissionLevel.NOT_ALLOWED.value,
                                "severity_change": PermissionLevel.NOT_ALLOWED.value
                            }
                        }
}

@api.resource('/users')
class UserList(Resource):
    def get(self):
        """List all registered users"""
        return user_claims, 200


@api.resource('/users/<username>')
class User(Resource):
    def get(self, username):
        """get a user token given the username"""
        token = jwt.encode(user_claims[username], 'eclk-incident-management', algorithm='HS256').decode('utf-8')
        return {
                    'user' : username,
                    'token': token
        }, 200
