from django.db import models

class File(models.Model):
    original_name = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    file = models.FileField(upload_to='files/')
    incident = models.ForeignKey("incidents.Incident", on_delete=models.DO_NOTHING)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("id",)

# from django.db import models

# class Document(models.Model):
#     description = models.CharField(max_length=255, blank=True)
#     document = models.FileField(upload_to='documents/')
#     uploaded_at = models.DateTimeField(auto_now_add=True)