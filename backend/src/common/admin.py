from django.contrib import admin
from .models import Category, Channel, District, PoliceDivision, PoliceStation, DSDivision, GNDivision, PoliticalParty
# Register your models here.

admin.site.register(Category)
admin.site.register(Channel)
admin.site.register(District)
admin.site.register(DSDivision)
admin.site.register(GNDivision)
admin.site.register(PoliticalParty)
admin.site.register(PoliceDivision)
admin.site.register(PoliceStation)
