from rest_framework import serializers
from .models import Incident, IncidentStatus, IncidentSeverity, Reporter, IncidentComment
from rest_framework import serializers

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
    currentStatus = serializers.ReadOnlyField(source="current_status")
    currentSeverity = serializers.ReadOnlyField(source="current_severity")
    createdDate = serializers.ReadOnlyField(source="created_date")
    reporter = ReporterSerializer()

    class Meta:
        model = Incident
        fields = "__all__"

class IncidentCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentComment
        fields = "__all__"
