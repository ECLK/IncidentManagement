from .models import File
from django.core import serializers

def get_incident_file_ids(incident_id: str):
    try:
        files = File.objects.filter(incident_id=incident_id)
        file_ids = []
        for f in files:
            file_ids.append(f.id)
        # return file_ids
        return files
        # return serializers.serialize('json',files)
    except Exception as e:
        return None