from rest_framework import mixins
from rest_framework import generics

from .models import Category, Channel
from .serializers import CategorySerializer, ChannelSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ChannelList(generics.ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer

class ChannelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer