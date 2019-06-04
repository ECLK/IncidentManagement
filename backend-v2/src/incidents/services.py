from .models import Incident

def is_valid_incident(incident_id: str) -> bool:
    try:
        incident = Incident.objects.get(id=incident_id)
        return True
    except Exception as e:
        return False