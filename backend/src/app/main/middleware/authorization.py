import jwt
from werkzeug.wrappers import Request, Response
from ..model.user import PermissionLevel

class Authorizer(object):

    route_permission_levels = {
        "status"   : PermissionLevel.ALLOWED_WITH_APPROVAL,
        "severity" : PermissionLevel.ALLOWED_WITH_APPROVAL
    }

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        req = Request(environ)
        if (req.method == 'OPTIONS') :
            return self.app(environ, start_response)

        token = req.headers['Authorization'][7:]
        claims = jwt.decode(token, 'eclk-incident-management', algorithms=['HS256'])

        path = req.path.split("/")[-1]

        if path in self.route_permission_levels:
            permission_level = self.route_permission_levels[path]
            print (claims['permissions'])
            if permission_level.value > claims['permissions'][path] :
                response = Response('Not Allowed!', status=403)
                return response(environ, start_response)

        return self.app(environ, start_response)
