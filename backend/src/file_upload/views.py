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

  def get(self, request, incident_id):
    files = get_incident_file_ids(incident_id)
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
      
  def post(self, request, incident_id):
    
    file_data = request.data
    file_data["incident"] = incident_id
    file_data["extension"] = file_data["file"].name.split('.')[-1]
    file_serializer = FileSerializer(data=file_data)
    if file_serializer.is_valid():
      file_serializer.save()
      incident = incident_service.get_incident_by_id(incident_id)
      uploaded_file = get_file_by_id(file_serializer.data["id"])
      print(uploaded_file)
      event_service.media_attached_event(request.user, incident)
      # event_service.media_attached_event(request.user, incident, uploaded_file)
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileDownload(APIView):

  def get(self, request, file_id):

    file_name = str(file_id)
    ext = request.GET.get('ext', '')
    file_full_name = file_name + "." + ext
    file_path = "media/" + file_full_name

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
        filename_header = 'filename=%s' % file_full_name.encode('utf-8')
    elif u'MSIE' in request.META['HTTP_USER_AGENT']:
        # IE does not support internationalized filename at all
        filename_header = ''
    else:
        # For others like Firefox
        filename_header = 'filename*=UTF-8\'\'%s' % urllib.parse.quote(file_full_name.encode('utf-8'))
    response['Content-Disposition'] = 'attachment; ' + filename_header
    return response
