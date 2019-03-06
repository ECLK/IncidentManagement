"""
Sketch of a testing framework
This does end-to-end testing, but right now for ease of development
the test db is created only ONCE for the seesion and destroyed aftet running ALL
tests
This must be later changed
"""
from unittest import TestCase
from manage import make_app, db
import seed

import pytest
import json

from app.main.service import incident, event

from app.main.model.event import EventAction

@pytest.fixture(scope='session')
def client():
    app = make_app('test')
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

def test_post_incident(client):
    """Posting an incident"""

    data = json.dumps(dict(
        title="Test incident",
        description="Test decription"
    ))

    res = client.post('/incidents', data=data, content_type='application/json')

    incidents = incident.get_all_incidents()

    assert len(incidents) == 1 and incidents[0].title == "Test incident"

    cur_incident = incidents[0]
    incident_events = event.get_incident_events(cur_incident.id)

    assert len(incident_events) == 1 and incident_events[0].action == EventAction.CREATED

