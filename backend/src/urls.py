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

from .custom_auth import views as user_views

from .file_upload import views as file_views

from .reporting import views as report_views

# JWT
from rest_framework_jwt.views import obtain_jwt_token

#swagger
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Incident Backend API')

urlpatterns = [
    path('', schema_view),

    path("admin/", admin.site.urls),
    path("auth-jwt/", obtain_jwt_token),

    path("categories/", common_views.CategoryList.as_view()),
    path("channels/", common_views.ChannelList.as_view()),
    path("districts/", common_views.DistrictList.as_view()),
    path("provinces/", common_views.ProvinceList.as_view()),
    
    path("wards/", common_views.WardList.as_view()),

    path("pollingstations/", common_views.PollingStationList.as_view()),
    path("pollingdivisions/", common_views.PollingDivisionList.as_view()),
    
    path("policestations/", common_views.PoliceStationList.as_view()),
    path("policedivisions/", common_views.PoliceDivisionList.as_view()),

    path("dsdivisions/", common_views.DSDivisionList.as_view()),
    path("gndivisions/", common_views.GNDivisionList.as_view()),

    path("politicalparties/", common_views.PoliticalPartyList.as_view()),

    path("incidents/", incident_views.IncidentList.as_view()),
    path("incidents/sms", incident_views.SMSIncident.as_view()),
    path("incidents/<uuid:incident_id>", incident_views.IncidentDetail.as_view()),
    path("incidents/<uuid:incident_id>/events", event_views.get_event_trail),
  
    path(
        "incidents/<uuid:incident_id>/comment",
        incident_views.IncidentCommentView.as_view(),
    ),
    path(
        "incidents/<uuid:incident_id>/attach_media",
        incident_views.IncidentMediaView.as_view(),
    ),
    path(
        "reporters/<int:reporter_id>", 
        incident_views.ReporterDetail.as_view(),
    ),
    path(
        "incidents/<uuid:incident_id>/files",
        file_views.FileView.as_view(),
    ),
    path(
        "incidents/files/download/<str:file_id>",
        file_views.FileDownload.as_view(),
    ),
    path(
        "users/",
        user_views.UserList.as_view(),
    ),
    path(
        "entities/",
        user_views.OrganizationList.as_view(),
    ),
    path(
        "incidents/<uuid:incident_id>/workflow/<str:workflow>",
        incident_views.IncidentWorkflowView.as_view()
    ),
    path(
        "reports/",
        report_views.ReportingView.as_view(),
    ),
    path('pdfgen/',
        report_views.ReportingAccessView.as_view(),
    ),
    path(
        "incidents/test",
        incident_views.Test.as_view()
    ),
    path(
        "incidents/auto-escalate",
        incident_views.IncidentAutoEscalate.as_view()
    ),

    # public paths

    path(
        "public/incidents/",
        incident_views.IncidentPublicUserView.as_view()
    ),
    path(
        "public/incidents/<uuid:incident_id>", 
        incident_views.IncidentPublicUserView.as_view()
    ),
    path(
        "public/reporters/<int:reporter_id>", 
        incident_views.ReporterPublicUserView.as_view()
    ),
    path(
        "public/incidents/<uuid:incident_id>/attach_media", 
        incident_views.IncidentMediaPublicUserView.as_view()
    ),
    path(
        "public/reporter/get_incident", 
        incident_views.IncidentViewPublicUserView.as_view()
    ),

]
