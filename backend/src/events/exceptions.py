from rest_framework.exceptions import APIException

class BaseException(APIException):
    pass

class EventException(BaseException):
    pass
    