from rest_framework import serializers
from .models import Category
from .modles import District

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # fields = ('id', 'top_category', 'sub_category')
        fields = "__all__"

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        # fields = ('id', 'top_category', 'sub_category')
        fields = "__all__"       