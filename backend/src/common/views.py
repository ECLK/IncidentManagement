from rest_framework import mixins
from rest_framework import generics

from .models import Category, Channel, District, PoliceStation, PollingStation, DSDivision, Ward
from .serializers import CategorySerializer, ChannelSerializer, DistrictSerializer, PoliceStationSerializer, PollingStationSerializer, DSDivisionSerializer, WardSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []


class ChannelList(generics.ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer

class DistrictList(generics.ListCreateAPIView):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer

class PoliceStationList(generics.ListCreateAPIView):
    queryset = PoliceStation.objects.all()
    serializer_class = PoliceStationSerializer

class PollingStationList(generics.ListCreateAPIView):
    queryset = PollingStation.objects.all()
    serializer_class = PollingStationSerializer

class DSDivisionList(generics.ListCreateAPIView):
    queryset = DSDivision.objects.all()
    serializer_class = DSDivisionSerializer

class WardList(generics.ListCreateAPIView):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer
