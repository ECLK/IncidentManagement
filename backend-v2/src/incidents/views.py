from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    JSONRenderer,
    HTMLFormRenderer,
)

from .models import Incident
from .serializers import IncidentSerializer
from .services import (
    get_incident_by_id,
    create_incident_postscript,
    update_incident_status,
)


class IncidentList(APIView):
    serializer_class = IncidentSerializer

    def get(self, request, format=None):
        incident = Incident.objects.all()
        serializer = IncidentSerializer(incident, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = IncidentSerializer(data=request.data)
        if serializer.is_valid():
            incident = serializer.save()
            create_incident_postscript(incident, request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidentDetail(APIView):
    serializer_class = IncidentSerializer

    def get(self, request, incident_id, format=None):
        incident = get_incident_by_id(incident_id)

        if incident is None:
            return Response("Invalid incident id", status=status.HTTP_404_NOT_FOUND)

        serializer = IncidentSerializer(incident)
        return Response(serializer.data)

    def put(self, request, incident_id, format=None):
        snippet = get_incident_by_id(incident_id)
        serializer = IncidentSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidentStatusView(APIView):
    def get(self, request, incident_id, format=None):
        action = request.GET.get("action")

        incident = get_incident_by_id(incident_id)

        if incident is None:
            return Response("Invalid incident id", status=status.HTTP_404_NOT_FOUND)

        if action:
            if action == "update":
                status_type = request.GET.get("type")
                result = update_incident_status(incident, request.user, status_type)

                if result[0] == "success":
                    return Response(result[1])
                elif result[0] == "error":
                    return Response(result[1], status=status.HTTP_400_BAD_REQUEST)

            return Response("Invalid action", status=status.HTTP_400_BAD_REQUEST)
        return Response("No action defined", status=status.HTTP_400_BAD_REQUEST)
