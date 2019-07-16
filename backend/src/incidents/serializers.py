from rest_framework import serializers
from .models import Incident, IncidentStatus, IncidentSeverity, Reporter, IncidentComment
from ..common.serializers import DistrictSerializer
from ..custom_auth.serializers import UserSerializer

class IncidentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentStatus
        fields = "__all__"

class IncidentSeveritySerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentSeverity
        fields = "__all__"

class ReporterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporter
        fields = "__all__"

class IncidentSerializer(serializers.ModelSerializer):
    hasPendingStatusChange = serializers.ReadOnlyField()
    hasPendingSeverityChange = serializers.ReadOnlyField()
    
    currentStatus = serializers.ReadOnlyField(source="current_status")
    currentSeverity = serializers.ReadOnlyField(source="current_severity")

    policeStation = serializers.ReadOnlyField(source="police_station")
    pollingStation = serializers.ReadOnlyField(source="polling_station")
    createdDate = serializers.ReadOnlyField(source="created_date")

    assignee = UserSerializer(read_only=True)

    # refId = serializers.CharField(required=False)
    # election = serializers.CharField(required=False)


    # reporter = ReporterSerializer()

    class Meta:
        model = Incident
        fields = "__all__"

class IncidentCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentComment
        fields = "__all__"

class IncidentCommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(source="body")
    isOutcome = serializers.BooleanField(source="is_outcome")

    class Meta:
        model = IncidentComment
        fields = ("comment", "isOutcome", "sn_body", "tm_body", "incident")
