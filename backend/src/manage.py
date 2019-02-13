import os
import unittest

from flask_migrate import Migrate, MigrateCommand

from app.main import create_app, db, blueprint, api
from app.main.model import category, district, election, incident, policestation, pollingstation, reporter, role, state, task, user
from app.main.controller import user, state_controller, task, category, district, policestation, election, pollingstation, reporter
from app.main.controller import incident, incident_comment, incident_severity, incident_status, incident_media, incident_entity, incident_relation, incident_outcome
from app.main.controller import action_entity

app = create_app(os.getenv('BOILERPLATE_ENV') or 'dev')
#app.register_blueprint(blueprint)

app.app_context().push()

migrate = Migrate(app, db)

#set_routes()

def run():
    app.run(host="0.0.0.0")


def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    run()
