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
)

class FileView(APIView):

  parser_classes = (MultiPartParser, FormParser)
  serializer_class = FileSerializer

  def get(self, request, incident_id):
    # file_ids = get_incident_file_ids(incident_id)
    # return Response(file_ids, status=status.HTTP_200_OK)
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
        # Safari 3.0 and Chrome 2.0 accepts UTF-8 encoded string directly.
        filename_header = 'filename=%s' % file_full_name.encode('utf-8')
    elif u'MSIE' in request.META['HTTP_USER_AGENT']:
        # IE does not support internationalized filename at all.
        # It can only recognize internationalized URL, so we do the trick via routing rules.
        filename_header = ''
    else:
        # For others like Firefox, we follow RFC2231 (encoding extension in HTTP headers).
        filename_header = 'filename*=UTF-8\'\'%s' % urllib.parse.quote(file_full_name.encode('utf-8'))
    response['Content-Disposition'] = 'attachment; ' + filename_header
    return response
