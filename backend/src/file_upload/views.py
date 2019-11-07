from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.utils.encoding import smart_str
from django.http import HttpResponse
from wsgiref.util import FileWrapper
import mimetypes
import os
import urllib

from .serializers import FileSerializer
from .services import ( 
    get_incident_file_ids,
    get_file_by_id
)
from ..events import services as event_service
from ..incidents import services as incident_service

class FileView(APIView):

  parser_classes = (MultiPartParser, FormParser)
  serializer_class = FileSerializer
  permission_classes = []

  def get(self, request, incident_id):
    files = get_incident_file_ids(incident_id)
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
      
  def post(self, request, incident_id):
    files = request.data.getlist("files[]")
    file_data = []
    for _file in files:
      file_dict = dict()
      file_dict["file"] = _file
      file_dict["incident"] = incident_id
      file_dict["extension"] = _file.name.split('.')[-1]
      file_dict["original_name"] = _file.name

      file_data.append(file_dict)

    file_serializer = FileSerializer(data=file_data, many=True)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileDownload(APIView):
  permission_classes = []

  def get(self, request, file_id):
    uploaded_file = get_file_by_id(file_id)
    file_path = uploaded_file.file.url
    file_full_name = uploaded_file.original_name

    fp = open(file_path, 'rb')
    response = HttpResponse(fp.read())
    fp.close()
    type, encoding = mimetypes.guess_type(file_full_name)
    if type is None:
        type = 'application/octet-stream'
    response['Content-Type'] = type
    response['Content-Length'] = str(os.stat(file_path).st_size)
    if encoding is not None:
        response['Content-Encoding'] = encoding

    if u'WebKit' in request.META['HTTP_USER_AGENT']:
        # Safari 3.0 and Chrome 2.0 
        filename_header = 'filename=%s' % file_full_name
    elif u'MSIE' in request.META['HTTP_USER_AGENT']:
        # IE does not support internationalized filename at all
        filename_header = ''
    else:
        # For others like Firefox
        filename_header = 'filename*=UTF-8\'\'%s' % file_full_name
    # response['Content-Disposition'] = 'attachment; ' + filename_header
    return response
