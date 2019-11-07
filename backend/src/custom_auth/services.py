from .exceptions import IdentityException
from django.contrib.auth.models import User, Permission

def user_can(user: User, permission: str):
    try:
        if user.username == "admin":
            return True

        permission = Permission.objects.get(codename=permission)
        user_level = user.profile.level
        user_permissions = permissions = Permission.objects.filter(group=user_level.role)
        return permission in user_permissions
    except:
        raise IdentityException("Unkown permission error")

    return False