from django import forms
from django.contrib import admin
from .models import Organization, Division, UserLevel, Profile
from django.contrib.auth.models import Permission
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import GroupAdmin, UserAdmin
import src.incidents.permissions as permissions

ALLOWED_PERMISSIONS = list(filter(lambda p : "CAN" in p, permissions.__dict__.keys()))

def _get_corrected_permissions():
    perms = Permission.objects.filter(codename__in=ALLOWED_PERMISSIONS)   
    return perms

class MyGroupAdminForm(forms.ModelForm):

    class Meta:
        model = Group
        fields = "__all__"

    permissions = forms.ModelMultipleChoiceField(
        _get_corrected_permissions(),
        widget=admin.widgets.FilteredSelectMultiple(('permissions'), False),
        help_text = 'Hold down "Control", or "Command" on a Mac, to select more than one.'
    )

class MyGroupAdmin(GroupAdmin):

    form = MyGroupAdminForm


# Register your models here.
admin.site.unregister(Group)
admin.site.register(Group, MyGroupAdmin)
admin.site.register(Organization)
admin.site.register(Division)
admin.site.register(UserLevel)
admin.site.register(Profile)