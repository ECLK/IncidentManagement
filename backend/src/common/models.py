from django.db import models

class Category(models.Model):
    # django puts a default auto increment 'id' fields
    top_category = models.CharField(max_length=200)
    sub_category = models.CharField(max_length=200)
    sn_top_category = models.CharField(max_length=200)
    sn_sub_category = models.CharField(max_length=200)
    tm_top_category = models.CharField(max_length=200)
    tm_sub_category = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)
    
class Channel(models.Model):
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    order = models.IntegerField(unique=True, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)
    
class District(models.Model):
    code = models.CharField(max_length=36, null=True, blank=True)
    name = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200)
    sn_province = models.CharField(max_length=200)
    tm_name = models.CharField(max_length=200)
    tm_province = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

class PoliceStation(models.Model):
    code = models.CharField(max_length=36, null=True, blank=True)
    name = models.CharField(max_length=200)
    division = models.CharField(max_length=200, default=None)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    sn_division = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    tm_division = models.CharField(max_length=200, null=True, blank=True)
    district = models.ForeignKey("District", on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)
    
class PollingStation(models.Model):
    code = models.CharField(max_length=36, null=True, blank=True)
    name = models.CharField(max_length=200)
    division = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    sn_division = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    tm_division = models.CharField(max_length=200, null=True, blank=True)
    district = models.ForeignKey("District", on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ('id',)

class DSDivision(models.Model):
    code = models.CharField(max_length=36, null=True, blank=True)
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    district = models.ForeignKey("District", on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

class GNDivision(models.Model):
    code = models.CharField(max_length=36, null=True, blank=True)
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    district = models.ForeignKey("District", on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

class Ward(models.Model):
    code = models.CharField(max_length=36, null=True, blank=True)
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    district = models.ForeignKey("District", on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)