from django.contrib import admin
from .models import Category, Channel, District, PoliceStation, DSDivision, GNDivision
# Register your models here.

admin.site.register(Category)
admin.site.register(Channel)
admin.site.register(District)
admin.site.register(PoliceStation)
admin.site.register(DSDivision)
admin.site.register(GNDivision)
