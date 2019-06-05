from rest_framework import serializers
from .models import Incident, IncidentStatus, IncidentSeverity, IncidentComment
from rest_framework import serializers

class IncidentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentStatus
        fields = "__all__"

class IncidentSeveritySerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentSeverity
        fields = "__all__"

class IncidentSerializer(serializers.ModelSerializer):
    current_status = serializers.ReadOnlyField()
    current_severity = serializers.ReadOnlyField()

    class Meta:
        model = Incident
        fields = "__all__"

class IncidentCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentComment
        fields = "__all__"
