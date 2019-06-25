"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from .common import views as common_views

from .events import views as event_views

from .incidents import views as incident_views

# JWT
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth-jwt/", obtain_jwt_token),
    path("categories/", common_views.CategoryList.as_view()),
    path("categories/<int:pk>/", common_views.CategoryDetail.as_view()),
    path("channels/", common_views.ChannelList.as_view()),
    path("channels/<int:pk>/", common_views.ChannelDetail.as_view()),
    path("districts/", common_views.DistrictList.as_view()),
    path("districts/<int:pk>/", common_views.DistrictDetail.as_view()),
    path("incidents/", incident_views.IncidentList.as_view()),
    path("incidents/<uuid:incident_id>", incident_views.IncidentDetail.as_view()),
    path("incidents/<uuid:incident_id>/events", event_views.get_event_trail),
    path(
        "incidents/<uuid:incident_id>/status",
        incident_views.IncidentStatusView.as_view(),
    ),
    path(
        "incidents/<uuid:incident_id>/severity",
        incident_views.IncidentSeverityView.as_view(),
    ),
    path("incidents/search/status", incident_views.IncidentSearchByStatus.as_view()),
]
