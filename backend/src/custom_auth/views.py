from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User
from .serializers import UserSerializer

class UserList(APIView):
    serializer_class = UserSerializer

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
