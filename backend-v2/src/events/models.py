from django.db import models
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

class AffectedAttribute(enum.Enum):
    STATUS = "Status"
    SEVERITY = "Severity"
    OUTCOME = "Outcome"

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # action type for the event, refer enums
    action = models.CharField(max_length=50, choices=[(tag, tag.value) for tag in EventAction])

    # refers to an external entity, ex: comment, media, outcome
    reference_id = models.IntegerField()

    # refers to an event linked to the current event i.e for an ATTRIBUTE_CHANGED 
    # event or an ATTRIBUTE_CHANGE_REJECTED event previously occured 
    # ATTRIBUTE_CHANGE_REQUESTED event's id
    linked_event_id = models.ForeignKey("Event", on_delete=models.DO_NOTHING)

    # specifies additional details
    description = models.CharField(max_length=200)

    # event intiator - should be a user
    intiator = models.IntegerField()

    # incident related to the event
    incident_id = models.ForeignKey("incidents.Incident", on_delete=models.DO_NOTHING)

    # attribute changed by the current event action
    affected_attribute = models.CharField(max_length=50, choices=[(tag, tag.value) for tag in AffectedAttribute])

    created_date = models.DateTimeField(auto_now_add=True)

    
    class Meta:
        ordering = ('created_date',)
