from django.db import models
from functools import partial
import uuid
import os

def _update_filename(instance, filename, path):
    path = path
    ext = filename.split('.')[-1]
    filename = str(uuid.uuid4()) + "." + ext

    return os.path.join(path, filename)

def upload_to(path):
    return partial(_update_filename, path=path)

class File(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(upload_to=upload_to(''), blank=False, null=False)
    original_name = models.TextField(blank=False, null=False)
    extension = models.CharField(max_length=20, default="no_ext", blank=False, null=False)
    incident = models.ForeignKey("incidents.Incident", on_delete=models.DO_NOTHING)
    remark = models.CharField(max_length=200, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_date',)
