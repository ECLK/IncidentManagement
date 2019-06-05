from rest_framework import serializers
from .models import Incident, IncidentStatus, IncidentSeverity, Reporter
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
    current_status = serializers.ReadOnlyField()
    current_severity = serializers.ReadOnlyField()
    reporter = ReporterSerializer()

    class Meta:
        model = Incident
        fields = "__all__"

