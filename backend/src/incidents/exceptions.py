from rest_framework.exceptions import APIException

class BaseException(APIException):
    pass

class IncidentException(BaseException):
    pass
    
class WorkflowException(BaseException):
    pass