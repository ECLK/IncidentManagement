from rest_framework import mixins
from rest_framework import generics
from django.db.models import F

from .models import Category, Channel, District, PoliceStation, PollingStation, DSDivision, GNDivision, Ward, PoliceDivision, PollingDivision
from .serializers import CategorySerializer, ChannelSerializer, DistrictSerializer, PoliceStationSerializer, PollingStationSerializer, DSDivisionSerializer, GNDivisionSerializer, WardSerializer, PoliceDivisionSerializer, PollingDivisionSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []


class ChannelList(generics.ListCreateAPIView):
    queryset = Channel.objects.all().order_by(F('order').asc(nulls_last=True))
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

class GNDivisionList(generics.ListCreateAPIView):
    queryset = GNDivision.objects.all()
    serializer_class = GNDivisionSerializer

class WardList(generics.ListCreateAPIView):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer

class PoliceDivisionList(generics.ListCreateAPIView):
    queryset = PoliceDivision.objects.all()
    serializer_class = PoliceDivisionSerializer

class PollingDivisionList(generics.ListCreateAPIView):
    queryset = PollingDivision.objects.all()
    serializer_class = PollingDivisionSerializer
