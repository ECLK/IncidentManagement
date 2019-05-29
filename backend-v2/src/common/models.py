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
    