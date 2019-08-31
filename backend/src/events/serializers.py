from rest_framework import serializers
from .models import Event
from rest_framework import serializers
from rest_framework.exceptions import APIException

from ..incidents.models import IncidentComment, IncidentStatus, IncidentSeverity
from django.contrib.auth.models import User

from ..incidents.serializers import IncidentSerializer, IncidentCommentSerializer
from ..custom_auth.serializers import UserSerializer

from ..file_upload.models import File
from ..file_upload.serializers import FileSerializer

class GenericDataRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, IncidentComment):
            return {
                "comment": {
                    "body": value.body,
                    "isOutcome": value.is_outcome
                }
            }
        elif isinstance(value, User):
            return {
                "user": {
                    "isAnonymous": False,
                    "userId": value.id,
                    "displayName": value.username
                }
            }
        elif isinstance(value, IncidentStatus):
            return {
                "status": {
                    "from_status_type": value.previous_status,
                    "to_status_type": value.current_status
                }
            }
        elif isinstance(value, IncidentSeverity):
            return {
                "status": {
                    "from_severity_type": value.previous_severity,
                    "to_severity_type": value.current_severity
                }
            }
        elif isinstance(value, File):
            return {
                "media": {
                    "file": {
                        "id": value.id,
                        "name": value.original_name,
                        "extension": value.extension
                    }
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

