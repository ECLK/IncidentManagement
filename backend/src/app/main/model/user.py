import enum

class PermissionLevel(enum.Enum):
    NOT_ALLOWED = 1  
    ALLOWED_WITH_APPROVAL = 2
    ALLOWED = 3
