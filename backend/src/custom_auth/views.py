from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User, Group
from .serializers import UserSerializer, GroupSerializer

class UserList(APIView):
    serializer_class = UserSerializer

    def get(self, request, format=None):
        users = User.objects.all().filter(is_active=True).exclude(first_name="").order_by('username')

        param_user_type = self.request.query_params.get('type', None)
        if param_user_type is not None and param_user_type != "":
            if param_user_type == "staff":
                users = users.filter(is_staff=True)

        param_user_org = self.request.query_params.get('org', None)
        if param_user_org is not None and param_user_org != "":
            users = users.filter(groups__organization__id=param_user_org)

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class OrganizationList(APIView):
    serializer_class = UserSerializer

    def get(self, request, format=None):
        organizations = Group.objects.filter(organization=None)
        serializer = GroupSerializer(organizations, many=True)
        return Response(serializer.data)