from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import (
    BrowsableAPIRenderer,
    JSONRenderer,
    HTMLFormRenderer,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.db.models import Q

from .models import Incident, StatusType, SeverityType
from django.contrib.auth.models import User, Group
from .serializers import (
    IncidentSerializer,
    ReporterSerializer,
    IncidentCommentSerializer,
    IncidentPoliceReportSerializer,
)
from .services import (
    get_incident_by_id,
    create_incident_postscript,
    update_incident_status,
    update_incident_severity,
    get_reporter_by_id,
    get_comments_by_incident,
    create_incident_comment_postscript,
    incident_auto_assign,
    incident_escalate,
    incident_change_assignee,
    incident_close,
    incident_escalate_external_action,
    incident_complete_external_action,
    incident_request_advice,
    incident_provide_advice,
    incident_verify,
    get_user_by_id,
    get_police_report_by_incident,
    get_incidents_to_escalate,
    auto_escalate_incidents,
    attach_media,
    get_fitlered_incidents_report,
    get_guest_user
)

from ..events import services as event_service
from ..file_upload import services as file_services
from .exceptions import IncidentException

import json


class IncidentResultsSetPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = "pageSize"
    max_page_size = 100


class IncidentList(APIView, IncidentResultsSetPagination):
    # authentication_classes = (JSONWebTokenAuthentication, )
    # permission_classes = (IsAuthenticated,)

    serializer_class = IncidentSerializer

    def get_paginated_response(self, data):
        return Response(
            dict(
                [
                    ("count", self.page.paginator.count),
                    ("pages", self.page.paginator.num_pages),
                    ("pageNumber", self.page.number),
                    ("incidents", data),
                ]
            )
        )

    def get(self, request, format=None):
        incidents = Incident.objects.all()
        user = request.user

        # filtering
        param_query = self.request.query_params.get('q', None)
        if param_query is not None and param_query != "":
            incidents = incidents.filter(
                Q(refId__icontains=param_query) | Q(title__icontains=param_query) | 
                Q(description__icontains=param_query))

        param_category = self.request.query_params.get('category', None)
        if param_category is not None:
            incidents = incidents.filter(category=param_category)

        param_response_time = self.request.query_params.get('response_time', None)
        if param_response_time is not None:
            incidents = incidents.filter(response_time__lte=int(param_response_time))

        param_start_date = self.request.query_params.get('start_date', None)
        param_end_date = self.request.query_params.get('end_date', None)

        if param_start_date and param_end_date:
            incidents = incidents.filter(
                created_date__range=(param_start_date, param_end_date))

        param_assignee = self.request.query_params.get('assignee', None)
        if param_assignee is not None:
            if param_assignee == "me":
                # get incidents of the current user
                incidents = incidents.filter(assignee=user)

        param_linked = self.request.query_params.get('user_linked', None)
        if param_linked is not None:
            if param_linked == "me":
                # get incidents of the current user
                incidents = incidents.filter(linked_individuals__id=user.id)


        # this will load all incidents to memory
        # change this to a better way next time
        param_status = self.request.query_params.get('status', None)
        if param_status is not None:
            try:
                status_type = StatusType[param_status]
                incidents = incidents.filter(current_status=param_status)
            except Exception as e:
                return Response("Invalid status", status=status.HTTP_400_BAD_REQUEST)

        param_severity = self.request.query_params.get('severity', None)
        if param_severity is not None:
            try:
                param_severity = int(param_severity)
                if param_severity < 1 or param_severity > 10:
                    raise IncidentException("Severity level must be between 1 - 10")
                incidents = incidents.filter(current_severity=param_severity)
            except:
                raise IncidentException("Severity level must be a number")
        
        param_export = self.request.query_params.get('export', None)
        if param_export is not None:
            # export path will send a different response
            return get_fitlered_incidents_report(incidents, param_export)

        results = self.paginate_queryset(incidents, request, view=self)
        serializer = IncidentSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = IncidentSerializer(data=request.data)

        if serializer.is_valid():
            incident = serializer.save()
            create_incident_postscript(incident, request.user)
            incident_police_report_data = request.data
            incident_police_report_data["incident"] = serializer.data["id"]
            incident_police_report_serializer = IncidentPoliceReportSerializer(data=incident_police_report_data)
            return_data = serializer.data

            if incident_police_report_serializer.is_valid():
                incident_police_report = incident_police_report_serializer.save()
                return_data.update(incident_police_report_serializer.data)
                return_data["id"] = serializer.data["id"]

            return Response(return_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidentDetail(APIView):
    """
    Incident Resoruce
    """
    serializer_class = IncidentSerializer

    def get(self, request, incident_id, format=None):
        """
            Get incident by incident id
        """
        incident = get_incident_by_id(incident_id)

        if incident is None:
            return Response("Invalid incident id", status=status.HTTP_404_NOT_FOUND)

        serializer = IncidentSerializer(incident)
        return Response(serializer.data)

    def put(self, request, incident_id, format=None):
        """
            Update existing incident
        """
        incident = get_incident_by_id(incident_id)
        serializer = IncidentSerializer(incident, data=request.data)
        incident_police_report = get_police_report_by_incident(incident)
        
        if serializer.is_valid():
            serializer.save()
            return_data = serializer.data

            if incident_police_report is not None:
                incident_police_report_data = request.data
                incident_police_report_data["incident"] = incident_id
                incident_police_report_serializer = IncidentPoliceReportSerializer(incident_police_report, data=incident_police_report_data)

                
                if incident_police_report_serializer.is_valid():
                    incident_police_report_serializer.save()
                    return_data.update(incident_police_report_serializer.data)
                    return_data["id"] = incident_id

            return Response(return_data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReporterDetail(APIView):
    serializer_class = ReporterSerializer

    def get(self, request, reporter_id, format=None):
        reporter = get_reporter_by_id(reporter_id)

        if reporter is None:
            return Response("Invalid reporter id", status=status.HTTP_404_NOT_FOUND)

        serializer = ReporterSerializer(reporter)
        return Response(serializer.data)

    def put(self, request, reporter_id, format=None):
        snippet = get_reporter_by_id(reporter_id)
        serializer = ReporterSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidentCommentView(APIView):
    serializer_class = IncidentCommentSerializer

    def get(self, request, incident_id, format=None):
        incident = get_incident_by_id(incident_id)
        if incident is None:
            return Response("Invalid incident id", status=status.HTTP_404_NOT_FOUND)

        comments = get_comments_by_incident(incident)
        serializer = IncidentCommentSerializer(comments)
        return Response(serializer.data)

    def post(self, request, incident_id, format=None):
        incident = get_incident_by_id(incident_id)
        if incident is None:
            return Response("Invalid incident id", status=status.HTTP_404_NOT_FOUND)

        comment_data = request.data
        serializer = IncidentCommentSerializer(data=comment_data)
        if serializer.is_valid():
            comment = serializer.save(incident=incident)
            create_incident_comment_postscript(incident, request.user, comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IncidentWorkflowView(APIView):
    def post(self, request, incident_id, workflow, format=None):

        incident = get_incident_by_id(incident_id)

        if workflow == "close":
            if not request.user.has_perm("incidents.can_change_status"):
                return Response("User can't close incident", status=status.HTTP_401_UNAUTHORIZED)

            comment = json.dumps(request.data['comment'])
            incident_close(request.user, incident, comment)

        elif workflow == "request-action":
            comment = json.dumps(request.data['comment'])
            incident_escalate_external_action(request.user, incident, comment)

        elif workflow == "complete-action":
            comment = json.dumps(request.data['comment'])
            start_event_id = request.data['start_event']
            start_event = event_service.get_event_by_id(start_event_id)
            incident_complete_external_action(
                request.user, incident, comment, start_event)

        elif workflow == "request-advice":
            comment = json.dumps(request.data['comment'])
            assignee_id = request.data['assignee']
            assignee = get_user_by_id(assignee_id)
            incident_request_advice(request.user, incident, assignee, comment)

        elif workflow == "provide-advice":
            comment = json.dumps(request.data['comment'])
            start_event_id = request.data['start_event']
            start_event = event_service.get_event_by_id(start_event_id)
            incident_provide_advice(request.user, incident, comment, start_event)

        elif workflow == "verify":
            comment = json.dumps(request.data['comment'])
            incident_verify(request.user, incident, comment)
            incident_escalate(request.user, incident)

        elif workflow == "assign":
            if not request.user.has_perm("incidents.can_change_assignee"):
                return Response("User can't change assignee", status=status.HTTP_401_UNAUTHORIZED)

            assignee_id = self.request.data['assignee']
            assignee = get_user_by_id(assignee_id)

            incident_change_assignee(request.user, incident, assignee)

        elif workflow == "escalate":
            incident_escalate(request.user, incident)

        else:
            return Response("Invalid workflow", status=status.HTTP_400_BAD_REQUEST)

        return Response("Incident workflow success", status=status.HTTP_200_OK)

class IncidentMediaView(APIView):
    def post(self, request, incident_id, format=None):

        incident = get_incident_by_id(incident_id)
        file_id = request.data['file_id']
        uploaded_file = file_services.get_file_by_id(file_id)
        attach_media(request.user, incident, uploaded_file)

        return Response("Incident workflow success", status=status.HTTP_200_OK)

class IncidentAutoEscalate(APIView):
    def get(self, request):
        escalated_incidents = auto_escalate_incidents()

        return Response(escalated_incidents, status=status.HTTP_200_OK)

class Test(APIView):
    def get(self, request):
        data = get_incidents_to_escalate()

        return Response(data)

# public user views

class IncidentPublicUserView(APIView):
    permission_classes = []
    serializer_class = IncidentSerializer

    def post(self, request, format=None):
        serializer = IncidentSerializer(data=request.data)

        if serializer.is_valid():
            incident = serializer.save()
            create_incident_postscript(incident, None)            
            return_data = serializer.data

            return Response(return_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, incident_id, format=None):
        """
            Update existing incident
        """
        incident = get_incident_by_id(incident_id)
        serializer = IncidentSerializer(incident, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return_data = serializer.data

            return Response(return_data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReporterPublicUserView(APIView):
    serializer_class = ReporterSerializer
    permission_classes = []

    def put(self, request, reporter_id, format=None):
        snippet = get_reporter_by_id(reporter_id)
        serializer = ReporterSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IncidentMediaPublicUserView(APIView):
    permission_classes = []

    def post(self, request, incident_id, format=None):

        incident = get_incident_by_id(incident_id)
        file_id = request.data['file_id']
        uploaded_file = file_services.get_file_by_id(file_id)
        attach_media(get_guest_user(), incident, uploaded_file)

        return Response("Incident workflow success", status=status.HTTP_200_OK)


