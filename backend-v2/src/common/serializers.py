from rest_framework import serializers
from .models import Category, Channel, District

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
