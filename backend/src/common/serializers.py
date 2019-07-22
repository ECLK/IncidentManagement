from rest_framework import serializers
from .models import Category, Channel, District, PoliceStation, PollingStation, DSDivision, Ward

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # fields = ('id', 'top_category', 'sub_category')
        fields = "__all__"

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = "__all__"       

class PoliceStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceStation
        fields = "__all__"     

class PollingStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollingStation
        fields = "__all__"

class DSDivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DSDivision
        fields = "__all__"

class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = "__all__"
