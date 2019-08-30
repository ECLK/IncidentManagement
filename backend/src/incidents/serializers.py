from rest_framework import serializers
from .models import Incident, IncidentStatus, IncidentSeverity, Reporter, IncidentComment, IncidentPoliceReport
from ..common.serializers import DistrictSerializer, PoliceStationSerializer
from ..common.models import PoliceStation
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

    # policeStation = serializers.IntegerField(source="police_station", required=False, allow_null=True)
    # pollingStation = serializers.IntegerField(source="polling_station", required=False, allow_null=True)
    createdDate = serializers.ReadOnlyField(source="created_date")

    assignee = UserSerializer(read_only=True)

    # refId = serializers.CharField(required=False)
    # election = serializers.CharField(required=False)


    # reporter = ReporterSerializer()

    class Meta:
        model = Incident
        exclude = ["created_date"]

    def get_extra_kwargs(self):
        blocked_list = ["description"]
        extra_kwargs = super(IncidentSerializer, self).get_extra_kwargs()
      
        if self.instance is not None and not isinstance(self.instance, list):
            for prop in blocked_list:
                kwargs = extra_kwargs.get(prop, {})
                kwargs['read_only'] = True
                extra_kwargs[prop] = kwargs
        
        return extra_kwargs

class IncidentPoliceReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentPoliceReport
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
