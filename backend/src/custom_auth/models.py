from django.db import models
from django.contrib.auth.models import User, Group
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save
from django.dispatch import receiver

# User.add_to_class('is_ecstaff', models.BooleanField(default=False))
# Group.add_to_class('rank', models.PositiveIntegerField(default=1,null=False, blank=False))
# Group.add_to_class('organization', models.ForeignKey(Group, blank=True, null=True, related_name='groups', on_delete=models.DO_NOTHING))

# class UserHierachy(models.Model):
#     group = models.ForeignKey(Group, on_delete=models.DO_NOTHING)
#     rank = models.PositiveIntegerField(default=0)
#     created_date = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ("id",)


class Organization(models.Model):
    code = models.CharField(max_length=10)
    displayName = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % (self.displayName)

class Division(models.Model):
    code = models.CharField(max_length=100)
    organization = models.ForeignKey(Organization, on_delete=models.DO_NOTHING)
    division_type = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    is_default_division = models.BooleanField(default=False)
    is_hq = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s - %s: %s' % (self.organization, self.division_type, self.name)

class UserLevel(models.Model):
    code = models.CharField(max_length=100)
    displayName = models.CharField(max_length=100)
    organization = models.ForeignKey(Organization, on_delete=models.DO_NOTHING)
    parent = models.ForeignKey('UserLevel', on_delete=models.DO_NOTHING, null=True, blank=True)
    role = models.ForeignKey(Group, on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s: %s' % (self.organization, self.displayName)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    organization = models.ForeignKey(Organization, on_delete=models.DO_NOTHING,  null=True, blank=True)
    division = models.ForeignKey(Division, on_delete=models.DO_NOTHING, null=True, blank=True)
    level = models.ForeignKey(UserLevel, on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return '%s' % (self.user)

@receiver(post_save, sender=User)
def create_user_profile(sender, **kwargs):
    user = kwargs['instance']
    
    if hasattr(user, 'profile') and user.profile is not None:
        return

    profile = Profile()
    profile.user = user
    profile.save()