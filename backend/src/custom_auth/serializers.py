from rest_framework import serializers
from django.contrib.auth.models import User, Permission

class PermissionSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Permission
        fields = ('name', 'codename')

class UserSerializer(serializers.ModelSerializer):
    uid = serializers.IntegerField(source="id")
    userName = serializers.CharField(source="username")
    isActive = serializers.CharField(source="is_active")
    displayname = serializers.SerializerMethodField('get_full_name')
    userPermissions = PermissionSerializer(source='user_permissions', many=True)

    def get_full_name(self, obj):
        return obj.first_name + " " + obj.last_name

    class Meta:
        model = User
        fields = ('uid', 'userName', 'displayname', 'isActive', 'userPermissions')
        # fields = "__all__"

