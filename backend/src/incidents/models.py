from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django_filters import rest_framework as filters
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid
import enum
from datetime import datetime

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
    # previous_severity = models.CharField(
    #     max_length=50,
    #     choices=[(tag.name, tag.value) for tag in SeverityType],
    #     blank=True,
    #     null=True,
    # )
    # current_severity = models.CharField(
    #     max_length=50, choices=[(tag.name, tag.value) for tag in SeverityType]
    # )
    previous_severity = models.PositiveIntegerField(default=10, validators=[MinValueValidator(1), MaxValueValidator(10)])
    current_severity = models.PositiveIntegerField(default=10, validators=[MinValueValidator(1), MaxValueValidator(10)])
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
    body = models.TextField(max_length=200)
    incident = models.ForeignKey("Incident", on_delete=models.DO_NOTHING)
    is_active = models.BooleanField(default=True)
    is_outcome = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=True)
    sn_body = models.CharField(max_length=200, blank=True)
    tm_body = models.CharField(max_length=200, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("id",)


def generate_ref_id():
    current_count = Incident.objects.count()
    refID = "%s/%0.4d" % (datetime.now().strftime("%Y/%m/%d"), current_count+1)
    return refID

class Incident(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    refId = models.CharField(max_length=200, default=generate_ref_id)

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
    election = models.CharField(max_length=200, blank=True)

    polling_station = models.CharField(max_length=200, blank=True, null=True)
    ds_division = models.CharField(max_length=200, blank=True, null=True)
    ward = models.CharField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=200, blank=True, null=True)
    police_station = models.CharField(max_length=200, blank=True, null=True)
    di_division = models.CharField(max_length=200, blank=True, null=True)
    police_division = models.CharField(max_length=200, blank=True, null=True)
    district = models.CharField(max_length=200, blank=True, null=True)
    province = models.CharField(max_length=200, blank=True, null=True)

    # the medium through which the incident was reported
    infoChannel = models.CharField(max_length=200, null=True, blank=True)

    # the person who reported the incident, not ncessarily the one
    # that entered it to the system
    reporter = models.ForeignKey(
        "Reporter", on_delete=models.DO_NOTHING, null=True, blank=True
    )

    hasPendingStatusChange = models.CharField(max_length=1, default='F', blank=True)
    hasPendingSeverityChange = models.CharField(max_length=1, default='T', blank=True)

    # assignees = models.ManyToManyField(User, blank=True)

    # assignee is the current responsible personnel for the current incident from the EC
    assignee = models.ForeignKey(User, related_name='incident_asignees', on_delete=models.DO_NOTHING, null=True, blank=True)
    # All the relavant parties such as police,lawyer,NGO etc.
    linked_individuals =  models.ManyToManyField(User, related_name='incident_linked_individuals', blank=True)

    # location related details
    location = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    coordinates = models.CharField(max_length=200, null=True, blank=True)
    

    complainer_consent = models.BooleanField(default=False, null=True, blank=True)

    response_time = models.IntegerField(default=12)

    occured_date = models.DateTimeField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    current_status = models.CharField(max_length=50, default=None, null=True, blank=True)
    current_severity = models.CharField(max_length=50, default=None, null=True, blank=True)

    # @property
    # def current_status(self, status_type=None):
    #     if status_type is None:
    #         status = (
    #             IncidentStatus.objects.filter(incident=self, approved=True)
    #             .order_by("-created_date")
    #             .first()
    #         )    
    #     else:
    #         status = (
    #             IncidentStatus.objects.filter(incident=self, approved=True, current_status=status_type)
    #             .order_by("-created_date")
    #             .first()
    #         )

    #     if status is not None:
    #         return status.current_status
    #     return None

    # @property
    # def current_severity(self):
    #     severity = (
    #         IncidentSeverity.objects.filter(incident=self, approved=True)
    #         .order_by("-created_date")
    #         .first()
    #     )
    #     if severity is not None:
    #         return severity.current_severity
    #     return None

    class Meta:
        ordering = ("created_date",)

        permissions = (
            ("can_change_assignee", "Can directly change assignee"),
        )

# the following signals will update the current status and severity fields
@receiver(post_save, sender=IncidentStatus)
def update_incident_current_status(sender, **kwargs):
    incident_status = kwargs['instance']
    incident = incident_status.incident
    incident.current_status = incident_status.current_status.name
    incident.save()

# the following signals will update the current status and severity fields
@receiver(post_save, sender=IncidentSeverity)
def update_incident_current_severity(sender, **kwargs):
    incident_severity = kwargs['instance']
    incident = incident_severity.incident
    incident.current_severity = incident_severity.current_severity
    incident.save()

class IncidentPoliceReport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    incident = models.ForeignKey("Incident", on_delete=models.DO_NOTHING)
    # division_serial_number
    # police_station_serial_number
    # policedivision
    # police sation *
    # elec division
    # date
    # time
    # place
    # complained date
    nature_of_incident = models.CharField(max_length=200, null=True, blank=True)
    complainers_name = models.CharField(max_length=200, null=True, blank=True)
    complainers_address = models.CharField(max_length=200, null=True, blank=True)
    # complainers political view
    # complainers candidate status
    victims_name = models.CharField(max_length=200, null=True, blank=True)
    victims_address = models.CharField(max_length=200, null=True, blank=True)
    respondents_name = models.CharField(max_length=200, null=True, blank=True)
    respondents_address = models.CharField(max_length=200, null=True, blank=True)
    # Respondents candidate status
    no_of_vehicles_arrested =  models.IntegerField(default=0, null=True, blank=True)
    steps_taken = models.CharField(max_length=200, null=True, blank=True)
    court_case_no = models.CharField(max_length=200, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("created_date",)

class IncidentFilter(filters.FilterSet):
    current_status = filters.ChoiceFilter(choices=StatusType, method='my_custom_filter')
    
    class Meta:
        model = Incident
        fields = ["current_status"]
    
    def my_custom_filter(self, queryset, name, value):
        print(queryset, name, value)

