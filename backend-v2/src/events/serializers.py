from rest_framework import serializers
from .models import Event
from rest_framework import serializers
from rest_framework.exceptions import APIException

from ..incidents.models import IncidentComment

from ..incidents.serializers import IncidentSerializer, IncidentCommentSerializer
from ..custom_auth.serializers import UserSerializer

class GenericDataRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, IncidentComment):
            return {
                "comment": {
                    "body": value.body,
                    "isOutcome": value.is_outcome
                }
            }

        raise APIException('Unexpected type of tagged object')


class EventSerializer(serializers.ModelSerializer):
    affectedAttribute = serializers.CharField(source="affected_attribute")
    createdDate = serializers.DateTimeField(source="created_date")
    data = GenericDataRelatedField(source="refered_model", read_only=True)
    incident = IncidentSerializer()
    initiator = UserSerializer()

    class Meta:
        model = Event
        fields = (
            "id",
            "action",
            "linked_event",
            "description",
            "initiator",
            "incident",
            "affectedAttribute",
            "createdDate",
            "data"
        )

