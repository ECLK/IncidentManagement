from .models import File
from django.core import serializers
from .exceptions import FileException

def get_file_by_id(file_id: str) -> File:
    try:
        requested_file = File.objects.get(id=file_id)
        if requested_file is None:
            raise FileException("Invalid file id")
    except:
        raise FileException("Invalid file id")

    return requested_file

def get_incident_file_ids(incident_id: str):
    try:
        files = File.objects.filter(incident_id=incident_id)
        file_ids = []
        for f in files:
            file_ids.append(f.id)
        return files
    except:
        raise FileException("Couldn't find files for the incident")
