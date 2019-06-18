from django.db import models
from django.contrib.auth.models import Group

Group.add_to_class('rank', models.PositiveIntegerField(default=1,null=False, blank=False))

# class UserHierachy(models.Model):
#     group = models.ForeignKey(Group, on_delete=models.DO_NOTHING)
#     rank = models.PositiveIntegerField(default=0)
#     created_date = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ("id",)
