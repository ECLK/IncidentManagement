# ===============================================================================
#
# @author: manujith (manujith.nc@gmail.com)
# If there's questions regarding serializer implementations please direct queries
# to above email or twitter
#
# ===============================================================================

from rest_framework import serializers
from .models import Incident, IncidentStatus, Reporter, IncidentComment, IncidentPoliceReport, IncidentPerson, IncidentVehicle, EscalateExternalWorkflow
from ..common.serializers import DistrictSerializer, PoliceStationSerializer
from ..common.models import PoliceStation
from ..custom_auth.serializers import UserSerializer
from django.db.models import Q

class IncidentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentStatus
        fields = "__all__"

class ReporterSerializer(serializers.ModelSerializer):

    politicalAffiliation = serializers.CharField(
        source="political_affiliation", required=False, allow_null=True, allow_blank=True)
    accusedName = serializers.CharField(
        source="accused_name", required=False, allow_null=True, allow_blank=True)
    accusedPoliticalAffiliation = serializers.CharField(
        source="accused_political_affiliation", required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Reporter
        exclude = ["political_affiliation", "accused_name", "accused_political_affiliation"]


class IncidentSerializer(serializers.ModelSerializer):

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

    lastAssignment = serializers.SerializerMethodField(method_name="get_last_assignment")

    severity = serializers.IntegerField(initial=0, allow_null=True)

    # refId = serializers.CharField(required=False)
    # election = serializers.CharField(required=False)
    # reporter = ReporterSerializer()

    # inquiry specifics
    receivedDate = serializers.DateField(source="received_date", allow_null=True)
    letterDate = serializers.DateField(source="letter_date", allow_null=True)
    currentDecision = serializers.ReadOnlyField(source="current_decision")

    class Meta:
        model = Incident
        exclude = ["created_date", "ds_division", "grama_niladhari",
                   "polling_division", "polling_station", "police_division", "police_station"]
        read_only_fields = ['recaptcha']

    def get_extra_kwargs(self):
        blocked_list = ["description"]
        extra_kwargs = super(IncidentSerializer, self).get_extra_kwargs()

        if self.instance is not None and not isinstance(self.instance, list):
            for prop in blocked_list:
                kwargs = extra_kwargs.get(prop, {})
                kwargs['read_only'] = True
                extra_kwargs[prop] = kwargs

        return extra_kwargs

    def get_last_assignment(self, obj):
        if obj.linked_individuals.count() > 0:
            last_assignment = EscalateExternalWorkflow.objects.filter(
                Q(incident=obj) & Q(is_action_completed=False) & Q(is_internal_user=True)
            ).order_by('-id').first()

            if last_assignment is not None:
                return {
                    "assigned_from": last_assignment.actioned_user.profile.division.__str__(),
                    "assigned_to": last_assignment.escalated_user.profile.division.__str__()
                }

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
        injured_parties_data = validated_data.pop("injured_parties")
        self.update_list(instance.injured_parties.all(), injured_parties_data,
                            IncidentPerson, instance.injured_parties)

        respondents_data = validated_data.pop("respondents")
        self.update_list(instance.respondents.all(), respondents_data,
                            IncidentPerson, instance.respondents)

        detained_vehicles_data = validated_data.pop("detained_vehicles")
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
