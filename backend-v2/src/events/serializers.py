from rest_framework import serializers
from .models import Event
from rest_framework import serializers

from ..incidents.serializers import IncidentSerializer

class EventSerializer(serializers.ModelSerializer):
    affectedAttribute = serializers.CharField(source="affected_attribute")
    data = serializers.ReadOnlyField()
    incident = IncidentSerializer()

    # def get_incident(self, obj):
    #     return obj.incident

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

            "created_date",
            "data",
        )

