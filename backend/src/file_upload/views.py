from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .serializers import FileSerializer

from .services import ( 
    get_incident_file_ids,
)

class FileView(APIView):

  parser_classes = (MultiPartParser, FormParser)

  def get(self, request, incident_id):
    file_ids = get_incident_file_ids(incident_id)
    return Response(file_ids, status=status.HTTP_200_OK)
      
  def post(self, request, incident_id):
    
    file_data = request.data
    file_data["incident"] = incident_id
    file_serializer = FileSerializer(data=file_data)
    if file_serializer.is_valid():
      file_serializer.save()
      return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
