from django.db import models

# Create your models here.


# dummy tables to support report types: severity-wise, status-wise
class SeveritySegment(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        ordering = ("id",)


class StatusSegment(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        ordering = ("id",)