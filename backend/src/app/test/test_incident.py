from unittest import TestCase
from helpers.app_helper import create_test_app
from manage import app, db

import unittest

class IncidentTest(TestCase):

    # I removed some config passing here
    def create_app(self):
        return create_test_app(app, db)

    def setUp(self):
        db.create_all()
    
    def test_incident(self):
        pass

    def tearDown(self):

        db.session.remove()
        db.drop_all()
        # app.app_context.pop()

if __name__ == "__main__":
    unittest.main()