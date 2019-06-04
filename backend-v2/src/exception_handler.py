from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
  # Call REST framework's default exception handler first,
  # to get the standard error response.
  response = exception_handler(exc, context)

  # Now add the HTTP status code to the response.
  if response is not None:

    errors = []
    message = response.data.get('detail')
    if not message:
        for field, value in response.data.items():
            errors.append("{} : {}".format(field, " ".join(value)))
        response.data = {'data': [], 'message': 'Validation Error', 'errors': errors, 'status': 'failure'}
    else:
        response.data = {'data': [], 'message': message, 'error': [message], 'success': 'failure'}

  return response