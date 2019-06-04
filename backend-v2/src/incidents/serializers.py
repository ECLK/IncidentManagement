from rest_framework import serializers
from .models import Incident
from rest_framework import serializers


class IncidentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Incident
        fields = (
            "id",
        )

