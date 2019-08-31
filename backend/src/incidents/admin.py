from django.contrib import admin
from .models import Incident, IncidentStatus, IncidentSeverity, IncidentComment, Reporter

admin.site.register(Incident)
admin.site.register(IncidentStatus)
admin.site.register(IncidentSeverity)
admin.site.register(IncidentComment)
admin.site.register(Reporter)