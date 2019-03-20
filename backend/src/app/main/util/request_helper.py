import jwt

def get_user_permissions(request):
    token = request.headers['Authorization'][7:]
    permissions = jwt.decode(token, 'eclk-incident-management', algorithms=['HS256'])['permissions']
    return permissions