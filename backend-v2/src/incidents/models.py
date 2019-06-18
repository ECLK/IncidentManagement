from django.db import models
import enum
from django.contrib.auth.models import User
import uuid


class Occurrence(enum.Enum):
    OCCURRED = "Occurred"
    OCCURRING = "Occurring"
    WILL_OCCUR = "Will Occur"

    def __str__(self):
        return self.name


class StatusType(enum.Enum):
    NEW = "New"
    CLOSED = "Closed"
    ACTION_TAKEN = "Action Taken"
    ACTION_PENDING = "Action Pending"
    ADVICE_PROVIDED = "Advice Provided"
    ADVICE_REQESTED = "Advice Requested"
    VERIFIED = "Verified"

    def __str__(self):
        return self.name


class SeverityType(enum.Enum):
    CRITICAL = "Critical"
    MAJOR = "Major"
    MODERATE = "Moderate"
    MINOR = "Minor"
    INSIGNIFICANT = "Insignificant"
    DEFAULT = "Default"

    def __str__(self):
        return self.name


class Reporter(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    reporter_type = models.CharField(max_length=200, null=True, blank=True)
    email = models.CharField(max_length=200, null=True, blank=True)
    telephone = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("id",)


class IncidentStatus(models.Model):
    previous_status = models.CharField(
        max_length=50,
        choices=[(tag.name, tag.value) for tag in StatusType],
        blank=True,
        null=True,
    )
    current_status = models.CharField(
        max_length=50, choices=[(tag.name, tag.value) for tag in StatusType]
    )
    incident = models.ForeignKey("Incident", on_delete=models.DO_NOTHING)
    approved = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("id",)

        permissions = (
            ("can_change_status", "Can directly change status"),
            ("can_request_status_change", "Can request to change status"),
            ("can_approve_status_change", "Can approve a status change request"),
            ("can_reject_status_change", "Can reject a status change request"),
        )


class IncidentSeverity(models.Model):
    previous_severity = models.CharField(
        max_length=50,
        choices=[(tag.name, tag.value) for tag in SeverityType],
        blank=True,
        null=True,
    )
    current_severity = models.CharField(
        max_length=50, choices=[(tag.name, tag.value) for tag in SeverityType]
    )
    incident = models.ForeignKey("Incident", on_delete=models.DO_NOTHING)
    approved = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("id",)

        permissions = (
            ("can_change_severity", "Can directly change severity"),
            ("can_request_severity_change", "Can request to change severity"),
            ("can_approve_severity_change", "Can approve a severity change request"),
            ("can_reject_severity_change", "Can reject a severity change request"),
        )


class IncidentComment(models.Model):
    body = models.CharField(max_length=200)
    incident = models.ForeignKey("Incident", on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(default=True)
    is_outcome = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=True)
    sn_body = models.CharField(max_length=200)
    tm_body = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("id",)


class Incident(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    refId = models.CharField(max_length=200)

    title = models.CharField(max_length=200)
    description = models.TextField()

    # the occurence flag of the incident - check enums for more details
    occurrence = models.CharField(
        max_length=50,
        choices=[(tag.name, tag.value) for tag in Occurrence],
        null=True,
        blank=True,
    )

    # getting the elections from a separate service
    election = models.CharField(max_length=200)
    polling_station = models.ForeignKey(
        "common.PollingStation", on_delete=models.DO_NOTHING, null=True, blank=True
    )
    ds_division = models.ForeignKey(
        "common.DSDivision", on_delete=models.DO_NOTHING, null=True, blank=True
    )
    ward = models.ForeignKey(
        "common.Ward", on_delete=models.DO_NOTHING, null=True, blank=True
    )
    category = models.ForeignKey(
        "common.Category", on_delete=models.DO_NOTHING, null=True, blank=True
    )

    # the medium through which the incident was reported
    infoChannel = models.CharField(max_length=200, null=True, blank=True)

    # the person who reported the incident, not ncessarily the one
    # that entered it to the system
    reporter = models.ForeignKey(
        "Reporter", on_delete=models.DO_NOTHING, null=True, blank=True
    )

    hasPendingStatusChange = models.BooleanField(default=False)
    hasPendingSeverityChange = models.BooleanField(default=False)

    # assignees = models.ManyToManyField(User, blank=True)

    # assignee is the current responsible personnel for the current incident from the EC
    assignee = models.ForeignKey(User, related_name='incident_asignees', on_delete=models.DO_NOTHING, null=True, blank=True)
    # All the relavant parties such as police,lawyer,NGO etc.
    linked_individuals =  models.ManyToManyField(User, related_name='incident_linked_individuals', blank=True)

    # location related details
    location = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    coordinates = models.CharField(max_length=200, null=True, blank=True)

    created_date = models.DateTimeField(auto_now_add=True)

    @property
    def current_status(self):
        status = (
            IncidentStatus.objects.filter(incident=self, approved=True)
            .order_by("-created_date")
            .first()
        )
        if status is not None:
            return status.current_status
        return None

    @property
    def current_severity(self):
        severity = (
            IncidentSeverity.objects.filter(incident=self, approved=True)
            .order_by("-created_date")
            .first()
        )
        if severity is not None:
            return severity.current_severity
        return None

    class Meta:
        ordering = ("created_date",)
