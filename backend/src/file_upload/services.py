from .models import File

def get_incident_file_ids(incident_id: str):
    try:
        files = File.objects.filter(incident_id=incident_id)
        file_ids = []
        for f in files:
            file_ids.append(f.id)
        return file_ids
    except Exception as e:
        return None