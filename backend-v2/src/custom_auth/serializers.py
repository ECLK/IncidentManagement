from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    userName = serializers.CharField(source="username")
    isActive = serializers.CharField(source="is_active")
    displayName = serializers.SerializerMethodField('get_full_name')

    def get_full_name(self, obj):
        return obj.first_name + " " + obj.last_name

    class Meta:
        model = User
        fields = ('id', 'userName', 'displayName', 'isActive')

