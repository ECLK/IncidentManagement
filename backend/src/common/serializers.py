from rest_framework import serializers
from .models import Category, Channel, Province, District, PoliceStation, PollingStation, DSDivision, GNDivision, Ward, PollingDivision, PoliceDivision, PoliticalParty


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # fields = ('id', 'top_category', 'sub_category')
        fields = "__all__"


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"

class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
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


class GNDivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GNDivision
        fields = "__all__"


class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = "__all__"


class PoliceDivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceDivision
        fields = "__all__"


class PollingDivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollingDivision
        fields = "__all__"

class PoliticalPartySerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliticalParty
        fields = "__all__"