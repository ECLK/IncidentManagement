from django.contrib import admin
from .models import Incident, IncidentStatus, IncidentSeverity, IncidentComment, Reporter, IncidentPoliceReport

admin.site.register(Incident)
admin.site.register(IncidentStatus)
admin.site.register(IncidentSeverity)
admin.site.register(IncidentComment)
admin.site.register(Reporter)
admin.site.register(IncidentPoliceReport)