"""
Sketch of a testing framework
This does end-to-end testing, but right now for ease of development
the test db is created only ONCE for the seesion and destroyed aftet running ALL
tests
This must be later changed
"""
import pytest
import json

from manage import make_app, db
import seed
from app.main.service import (
    incident,
    event,
    incident_entity,
    incident_outcome,
    incident_status,
    incident_severity,
    incident_comment
)
from app.main.model.event import EventAction
from app.main.model.occurence import Occurence
from app.main.model.incident_status import StatusType
from app.main.model.incident_severity import SeverityLevel


@pytest.fixture(scope="session")
def client():
    app = make_app("test")
    app.app_context().push()
    client = app.test_client()

    with app.app_context():
        db.create_all()
        seed.main()

    yield client

    db.session.remove()
    db.drop_all()


# def test_categorys(client):
#     """Test categorys"""

#     res = client.get('/categorys').json

#     assert len(res) == 15, "Expect %dcategorys" % 15


def test_create_incident(client):
    """Posting an incident"""

    data = json.dumps(dict(title="Test incident", description="Test decription"))

    rv = client.post("/incidents", data=data, content_type="application/json")
    res = rv.get_json()

    incidents = incident.get_all_incidents()

    assert (
        len(incidents) == 1
        and incidents[0].title == "Test incident"
        and res["incident_id"] == incidents[0].id
    )

    cur_incident = incidents[0]
    incident_events = event.get_incident_events(cur_incident.id)

    assert (
        len(incident_events) == 1 and incident_events[0].action == EventAction.CREATED
    )


def test_update_incident(client):
    """Updating new incident"""

    data = json.dumps(dict(title="Test incident", description="Test decription"))
    rv = client.post("/incidents", data=data, content_type="application/json")
    res = rv.get_json()

    incident_id = res["incident_id"]

    data = json.dumps(dict(category=1, police_station_id=1, occurence="HAPPENED"))
    rv = client.put(
        "/incidents/%d" % incident_id, data=data, content_type="application/json"
    )
    res = rv.get_json()

    db_incident = incident.get_a_incident(incident_id)

    assert (
        res["status"] == "SUCCESS"
        and db_incident.category == 1
        and db_incident.occurence == Occurence.HAPPENED
    )


def test_add_incident_entity(client):
    """Adding new entity to incident"""

    data = json.dumps(dict(title="Test incident", description="Test decription"))
    rv = client.post("/incidents", data=data, content_type="application/json")
    res = rv.get_json()

    incident_id = res["incident_id"]

    data = json.dumps(dict(incident_id=incident_id, entity_id=1, description="Polize"))
    rv = client.post("/incident_entitys", data=data, content_type="application/json")
    res = rv.get_json()

    db_entities = incident_entity.get_incident_entities(incident_id)

    assert len(db_entities) == 1 and db_entities[0].id == res["incident_entity_id"]


def test_add_incident_outcome(client):
    """Adding new outcome to incident"""

    data = json.dumps(dict(title="Test incident", description="Test decription"))
    rv = client.post("/incidents", data=data, content_type="application/json")
    res = rv.get_json()

    incident_id = res["incident_id"]

    data = json.dumps(
        dict(incident_id=incident_id, type="Outcome type", title="Generic outcome")
    )
    rv = client.post("/incident_outcomes", data=data, content_type="application/json")
    res = rv.get_json()

    db_outcomes = incident_outcome.get_incident_outcomes(incident_id)

    assert len(db_outcomes) == 1 and db_outcomes[0].id == res["incident_outcome_id"]

def test_change_status(client):
    """Adding new outcome to incident"""

    data = json.dumps(dict(title="Test incident", description="Test decription"))
    rv = client.post("/incidents", data=data, content_type="application/json")
    res = rv.get_json()

    incident_id = res["incident_id"]

    data = json.dumps(dict(status_type="ACTION_TAKEN"))
    rv = client.post(
        "/incident/%d/status" % incident_id, data=data, content_type="application/json"
    )
    res = rv.get_json()

    db_incident = incident.get_a_incident(incident_id)
    db_incident_status = incident_status.get_a_incident_status(
        db_incident.current_status
    )

    assert (
        db_incident_status is not None
        and db_incident_status.status_type == StatusType.ACTION_TAKEN
    )

def test_change_severity(client):
    """Adding new outcome to incident"""

    data = json.dumps(dict(title="Test incident", description="Test decription"))
    rv = client.post("/incidents", data=data, content_type="application/json")
    res = rv.get_json()

    incident_id = res["incident_id"]

    data = json.dumps(dict(level="MODERATE"))
    rv = client.post(
        "/incident/%d/severity" % incident_id, data=data, content_type="application/json"
    )
    res = rv.get_json()

    db_incident = incident.get_a_incident(incident_id)
    db_incident_severity = incident_severity.get_a_incident_severity(
        db_incident.current_severity
    )

    assert (
        db_incident_severity is not None
        and db_incident_severity.level == SeverityLevel.MODERATE
)

def test_add_incident_comment(client):
    """Test Adding new comment to incident"""

    data = json.dumps(dict(title="Test incident", description="Test decription"))
    rv = client.post("/incidents", data=data, content_type="application/json")
    res = rv.get_json()

    incident_id = res["incident_id"]

    data = json.dumps(dict(incident_id=incident_id, name="Test comment name", \
        body="Test comment body"))

    rv = client.post("/incident_comments", data=data, content_type="application/json")
    res = rv.get_json()

    db_outcomes = incident_comment.get_incident_comments(incident_id)
    assert len(db_outcomes) == 1 and db_outcomes[0].id == res["id"]

def test_update_incident_comment(client):
    """Test Updating comment of an incident"""

    data = json.dumps(dict(title="Test incident", description="Test decription"))
    rv = client.post("/incidents", data=data, content_type="application/json")
    res = rv.get_json()
    incident_id = res["incident_id"]

    data = json.dumps(dict(incident_id=incident_id, name="Test comment name", \
        body="Test comment body"))
    rv = client.post("/incident_comments", data=data, content_type="application/json")
    res = rv.get_json()
    incident_comment_id = res["id"]

    data = json.dumps(dict(name="Test updated comment name", body="Test comment updated body"))
    rv = client.put("/incident_comments/%d" % incident_comment_id, data=data, \
        content_type="application/json")
    res = rv.get_json()

    db_outcomes = incident_comment.get_incident_comments(incident_id)
    assert len(db_outcomes) == 1 and db_outcomes[0].body == "Test comment updated body"
    
