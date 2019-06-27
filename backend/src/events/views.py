from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .services import get_events_by_incident_id
from .serializers import EventSerializer

from ..incidents.services import is_valid_incident

@api_view(['GET'])
def get_event_trail(request, incident_id):
    if request.method == "GET":
        if is_valid_incident(incident_id):
            events = get_events_by_incident_id(incident_id)
            serializer = EventSerializer(events, many=True)

            return Response(serializer.data)
        
        return Response("Invalid incident id", status=status.HTTP_400_BAD_REQUEST)
    
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

