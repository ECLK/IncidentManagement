from django.db import models
import enum
from django.contrib.auth.models import User
import uuid 

class Occurrence(enum.Enum):
    OCCURRED = "Occurred"
    OCCURRING = "Occurring"
    WILL_OCCUR = "Will Occur"

class StatusType(enum.Enum):
    NEW = "New"
    CLOSED = "Closed"
    ACTION_TAKEN = "Action Taken"
    ACTION_PENDING = "Action Pending"
    ADVICE_PROVIDED = "Advice Provided"
    ADVICE_REQESTED = "Advice Requested"
    VERIFIED = "Verified"

class SeverityType(enum.Enum):
    CRITICAL = "Critical"
    MAJOR = "Major"
    MODERATE = "Moderate"
    MINOR = "Minor"
    INSIGNIFICANT = "Insignificant"
    DEFAULT = "Default"

class Incident(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    refId = models.CharField(max_length=200)

    title = models.CharField(max_length=200)
    description = models.TextField()

    # the occurence flag of the incident - check enums for more details
    occurrence = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in Occurrence], null=True, blank=True)

    # getting the elections from a separate service
    election = models.CharField(max_length=200)
    # polling_station = models.ForeignKey("common.PolllingStation", on_delete=models.DO_NOTHING, null=True, blank=True)
    # ds_division = models.ForeignKey("common.DSDivision", on_delete=models.DO_NOTHING, null=True, blank=True)
    # ward = models.ForeignKey("common.Ward", on_delete=models.DO_NOTHING, null=True, blank=True)
    # category = models.ForeignKey("common.Category", on_delete=models.DO_NOTHING, null=True, blank=True)

    # the medium through which the incident was reported
    infoChannel = models.CharField(max_length=200)

    # the person who reported the incident, not ncessarily the one 
    # that entered it to the system
    # reporter = models.ForeignKey("common.Reporter", on_delete=models.DO_NOTHING, null=True, blank=True)

    current_status = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in StatusType], null=True, blank=True)
    previous_status = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in StatusType], null=True, blank=True)
    current_severity = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in SeverityType], null=True, blank=True)
    previous_severity = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in SeverityType], null=True, blank=True)
    assignees =  models.ManyToManyField(User)
    hasPendingStatusChange = models.BooleanField()

    location = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    coordinates = models.CharField(max_length=200)

    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_date',)
