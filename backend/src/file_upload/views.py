from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.utils.encoding import smart_str
from django.http import HttpResponse
from wsgiref.util import FileWrapper
import mimetypes
import os

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

  # def download(request,file_name):
  def get(self, request):
    file_path = "media/1e7714b7-efc9-43a0-af10-0c0385a64114.png"
    # /media/achala/Data3/Projects/LSF/IncidentManagement/backend
    # file_path = settings.MEDIA_ROOT +'/'+ file_name
    file_wrapper = FileWrapper(open(file_path,'rb'))
    file_mimetype = mimetypes.guess_type(file_path)
    response = HttpResponse(file_wrapper)
    response['X-Sendfile'] = file_path
    response['Content-Length'] = os.stat(file_path).st_size
    response['Content-Disposition'] = 'attachment; filename=%s' % smart_str("f076d5ca-1ce0-4ccb-be6d-ff39e91831d9.png") 
    return response