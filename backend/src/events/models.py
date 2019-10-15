from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
import enum
import uuid

class EventAction(enum.Enum):
    CREATED = "Created"
    GENERIC_UPDATE = "Generic Update"
    ATTRIBUTE_CHANGE_REQUESTED = "Attribute change requested"
    ATTRIBUTE_CHANGE_APPROVED = "Attribute change approved"
    ATTRIBUTE_CHANGED = "Attribute changed"
    ATTRIBUTE_CHANGE_REJECTED = "Attribute change rejected"
    COMMENTED = "Commented"
    OUTCOME_ADDED = "Outcome added"
    ENTITY_ASSIGNED = "Entity assigned"
    ENTITY_REMOVED = "Entity removed"
    ACTION_STARTED = "Started Action"
    ACTION_COMPLETED = "Ended Action"
    MEDIA_ATTACHED = "Media Attached"
    WORKFLOW_ACTIONED = "Workflow Actioned"

    def __str__(self):
        return self.name

class AffectedAttribute(enum.Enum):
    STATUS = "Status"
    SEVERITY = "Severity"
    OUTCOME = "Outcome"

    def __str__(self):
        return self.name

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # action type for the event, refer enums
    action = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in EventAction])

    # refers to an external entity, ex: comment, media, outcome
    reference_id = models.IntegerField(null=True, blank=True)
    refered_model_type = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING, null=True, blank=True)
    refered_model = GenericForeignKey('refered_model_type', 'reference_id')

    # refers to an event linked to the current event i.e for an ATTRIBUTE_CHANGED 
    # event or an ATTRIBUTE_CHANGE_REJECTED event previously occured 
    # ATTRIBUTE_CHANGE_REQUESTED event's id
    linked_event = models.ForeignKey("Event", on_delete=models.DO_NOTHING, null=True, blank=True)

    # specifies additional details
    description = models.TextField(null=True, blank=True)

    # event intiator - should be a user
    initiator = models.ForeignKey(User, on_delete=models.DO_NOTHING)

    # incident related to the event
    incident = models.ForeignKey("incidents.Incident", on_delete=models.DO_NOTHING)

    # attribute changed by the current event action
    affected_attribute = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in AffectedAttribute], null=True, blank=True)

    created_date = models.DateTimeField(auto_now_add=True)

    
    class Meta:
        ordering = ('created_date',)
