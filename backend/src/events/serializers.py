from rest_framework import serializers
from .models import Event
from rest_framework import serializers
from rest_framework.exceptions import APIException

from ..incidents.models import (
    IncidentComment, 
    IncidentStatus, 
    VerifyWorkflow,
    EscalateExternalWorkflow,
    CompleteActionWorkflow,
    RequestAdviceWorkflow,
    ProvideAdviceWorkflow,
    AssignUserWorkflow,
    EscalateWorkflow,
    CloseWorkflow,
    InvalidateWorkflow,
    ReopenWorkflow
)
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
        elif isinstance(value, VerifyWorkflow):
            return {
                "workflow": {
                    "type": "Verify",
                    "data": {
                        "comment": value.comment,
                        "hasProof": value.has_proof
                    }
                }
            }
        elif isinstance(value, EscalateExternalWorkflow):
            entity = {}
            if(value.is_internal_user):
                entity["name"] = value.escalated_user.get_full_name()
                if hasattr(value.escalated_user, "profile"):
                    if value.escalated_user.profile is not None:
                        entity["type"] = value.escalated_user.profile.organization.displayName
            else:
                entity["name"] = value.escalated_user_other
                entity["type"] = value.escalated_entity_other

            return {
                "workflow": {
                    "type": "Escalate External",
                    "data": {
                        "comment": value.comment,
                        "entity": entity,
                        "isCompleted": value.is_action_completed
                    }
                }
            }
        elif isinstance(value, CompleteActionWorkflow):
            return {
                "workflow": {
                    "type": "Complete Action",
                    "data": {
                        "comment": value.comment
                    }
                }
            }
        elif isinstance(value, RequestAdviceWorkflow):
            return {
                "workflow": {
                    "type": "Request Advice",
                    "data": {
                        "comment": value.comment,
                        "isCompleted": value.is_advice_provided,
                        "assignee": value.assigned_user.get_full_name()
                    }
                }
            }
        elif isinstance(value, ProvideAdviceWorkflow):
            return {
                "workflow": {
                    "type": "Provide Advice",
                    "data": {
                        "comment": value.comment
                    }
                }
            }
        elif isinstance(value, AssignUserWorkflow):
            return {
                "workflow": {
                    "type": "Assign",
                    "data": {
                        "assignee": value.assignee.get_full_name()
                    }
                }
            }
        elif isinstance(value, EscalateWorkflow):
            return {
                "workflow": {
                    "type": "Escalate",
                    "data": {
                        "assignee": value.assignee.get_full_name(),
                        "comment": value.comment,
                        "responseTime": value.response_time
                    }
                }
            }
        elif isinstance(value, CloseWorkflow):
            return {
                "workflow": {
                    "type": "Close",
                    "data": {
                        "assignees": value.assignees,
                        "entities": value.entities,
                        "departments": value.departments,
                        "individuals": value.individuals,
                        "remark": value.comment,
                    }
                }
            }
        elif isinstance(value, InvalidateWorkflow):
            return {
                "workflow": {
                    "type": "Invalidate",
                    "data": {
                        "comment": value.comment
                    }
                }
            }
        elif isinstance(value, ReopenWorkflow):
            return {
                "workflow": {
                    "type": "Reopen",
                    "data": {
                        "comment": value.comment
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

