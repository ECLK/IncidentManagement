from django.contrib import admin
from .models import Organization, Division, UserLevel, Profile

# Register your models here.
admin.site.register(Organization)
admin.site.register(Division)
admin.site.register(UserLevel)
admin.site.register(Profile)