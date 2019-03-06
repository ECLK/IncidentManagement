from unittest import TestCase
from manage import app, db

import unittest
import pytest

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config["MYSQL_PATH"] = "mysql://root:toor@localhost/lsf-test"
    
    client = app.test_client()

    # with app.app_context():
    #     flaskr.init_db()

    yield client

def test_empty_db(client):
    """Start with a blank database."""

    rv = client.get('/categorys')
    assert b'No entries here so far' in rv.data

# class IncidentTest(TestCase):

#     # I removed some config passing here
#     def create_app(self):
#         app.config['TESTING'] = True
#         app.config["MYSQL_PATH"] = "mysql://root:toor@localhost/lsf-test"
#         return app

#     def setUp(self):
#         print(self)
#         db.create_all()
    
#     def test_incident(self):
#         pass

#     def tearDown(self):

#         db.session.remove()
#         db.drop_all()
#         # app.app_context.pop()

if __name__ == "__main__":
    unittest.main()