from django.db import models
import enum

class PartyType(enum.Enum):
    REGISTERED_PARTY = "Registered Party"
    NON_REGISTERED_PARTY = "Non Registered Party"
    INDEPENDENT_GROUP = "Independent Group"

    def __str__(self):
        return self.name

class Category(models.Model):
    # django puts a default auto increment 'id' fields
    code = models.CharField(max_length=36, unique=True) # this is introduced just to help the process at EC
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

class Province(models.Model):
    code = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=100)
    sn_name = models.CharField(max_length=100)
    tm_name = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

class District(models.Model):
    code = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=200)
    province = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200)
    sn_province = models.CharField(max_length=200)
    tm_name = models.CharField(max_length=200)
    tm_province = models.CharField(max_length=200)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return '%s | %s' % (self.code, self.name)


class PollingDivision(models.Model):
    code = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

class PollingStation(models.Model):
    code = models.CharField(max_length=36, unique=True)
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
    code = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    district = models.ForeignKey("District", on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

class GNDivision(models.Model):
    code = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    district = models.ForeignKey("District", on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

class Ward(models.Model):
    code = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    district = models.ForeignKey("District", on_delete=models.DO_NOTHING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

class PoliceDivision(models.Model):
    code = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return '%s | %s' % (self.code, self.name)


class PoliceStation(models.Model):
    code = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=200)
    division = models.CharField(max_length=200, default=None)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    division = models.ForeignKey("PoliceDivision", to_field="code", on_delete=models.DO_NOTHING, null=True, blank=True, db_column="division_code")
    district = models.ForeignKey("District", to_field="code", on_delete=models.DO_NOTHING, null=True, blank=True, db_column="district_code")
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return '%s | %s' % (self.code, self.name)


class PoliticalParty(models.Model):
    code = models.CharField(max_length=36, unique=True)
    party_type = models.CharField(
        max_length=50,
        choices=[(tag.name, tag.value) for tag in PartyType],
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=200)
    sn_name = models.CharField(max_length=200, null=True, blank=True)
    tm_name = models.CharField(max_length=200, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id',)