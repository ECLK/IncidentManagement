# ===============================================================================
#
# @author: manujith (manujith.nc@gmail.com)
# If there's questions regarding serializer implementations please direct queries
# to above email or twitter
# 
# ===============================================================================

from rest_framework import serializers
from .models import Incident, IncidentStatus, IncidentSeverity, Reporter, IncidentComment, IncidentPoliceReport, IncidentPerson, IncidentVehicle
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

    divisionalSecretariat = serializers.CharField(
        source="ds_division", required=False, allow_null=True, allow_blank=True)

    gramaNiladhari = serializers.CharField(
        source="grama_niladhari", required=False, allow_null=True, allow_blank=True)

    pollingDivision = serializers.CharField(
        source="polling_division", required=False, allow_null=True, allow_blank=True)

    pollingStation = serializers.CharField(
        source="polling_station", required=False, allow_null=True, allow_blank=True)

    policeDivision = serializers.CharField(
        source="police_division", required=False, allow_null=True, allow_blank=True)

    policeStation = serializers.CharField(
        source="police_station", required=False, allow_null=True, allow_blank=True
    )

    reporterConsent = serializers.BooleanField(
        source="complainer_consent", required=False, allow_null=True
    )

    politicalParty = serializers.CharField(
        source="polictical_party", required=False, allow_null=True, allow_blank=True
    )

    createdDate = serializers.ReadOnlyField(source="created_date")

    assignee = UserSerializer(read_only=True)

    # refId = serializers.CharField(required=False)
    # election = serializers.CharField(required=False)

    # reporter = ReporterSerializer()

    class Meta:
        model = Incident
        exclude = ["created_date", "ds_division", "grama_niladhari",
                   "polling_division", "polling_station", "police_division", "police_station"]

    def get_extra_kwargs(self):
        blocked_list = ["description"]
        extra_kwargs = super(IncidentSerializer, self).get_extra_kwargs()

        if self.instance is not None and not isinstance(self.instance, list):
            for prop in blocked_list:
                kwargs = extra_kwargs.get(prop, {})
                kwargs['read_only'] = True
                extra_kwargs[prop] = kwargs

        return extra_kwargs

class IncidentPersonSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False, write_only=False)

    class Meta:
        model = IncidentPerson
        fields = "__all__"

class IncidentVehicleSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False, write_only=False)

    class Meta:
        model = IncidentVehicle
        fields = "__all__"

class IncidentPoliceReportSerializer(serializers.ModelSerializer):
    injuredParties = IncidentPersonSerializer(source="injured_parties", many=True)
    respondents = IncidentPersonSerializer(many=True)
    detainedVehicles = IncidentVehicleSerializer(source="detained_vehicles", many=True)
    
    def create_list(self, validated_list, instance_field):
        for item in validated_list:
            instance_field.create(**item)

    def update_list(self, instance_list, validated_list, child_class, instance_field):
        print(instance_list)
        print(validated_list)
        remove_items = { item.id: item for item in instance_list }

        for item in validated_list:
            item_id = item.get("id", None)

            if item_id is None:
                # new item so create this
                instance_field.create(**item)
            elif remove_items.get(item_id, None) is not None:
                # update this item
                instance_item = remove_items.pop(item_id)
                child_class.objects.filter(id=instance_item.id).update(**item)

        for item in remove_items.values():
            item.delete()
    
    def create(self, validated_data):
        injured_parties_data = validated_data.pop("injured_parties")
        respondents_data = validated_data.pop("respondents")
        detained_vehicles_data = validated_data.pop("detained_vehicles")

        instance = IncidentPoliceReport(**validated_data)
        instance.save()

        self.create_list(injured_parties_data, instance.injured_parties)
        self.create_list(respondents_data, instance.respondents)
        self.create_list(detained_vehicles_data, instance.detained_vehicles)

        return instance

    def update(self, instance, validated_data):
        print(validated_data)
        injured_parties_data = validated_data.pop("injured_parties")
        self.update_list(instance.injured_parties.all(), injured_parties_data, 
                            IncidentPerson, instance.injured_parties)

        respondents_data = validated_data.pop("respondents")
        self.update_list(instance.respondents.all(), respondents_data, 
                            IncidentPerson, instance.respondents)

        detained_vehicles_data = validated_data.pop("detained_vehicles")
        print(detained_vehicles_data)
        self.update_list(instance.detained_vehicles.all(), detained_vehicles_data, 
                            IncidentVehicle, instance.detained_vehicles)
                    

        for field in validated_data:
            setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        instance.save()

        return instance

    class Meta:
        model = IncidentPoliceReport
        # fields = "__all__"
        exclude = ["injured_parties", "detained_vehicles"]


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
