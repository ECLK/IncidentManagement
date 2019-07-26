from django.contrib import admin
from .models import Category, Channel, District, PoliceStation
# Register your models here.

admin.site.register(Category)
admin.site.register(Channel)
admin.site.register(District)
admin.site.register(PoliceStation)
