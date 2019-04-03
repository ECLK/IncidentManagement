import os
from manage import make_app, db
import seed

if __name__ == "__main__":
    print("Initializing app")
    app = make_app(os.getenv('APP_ENV') or 'dev')
    app.app_context().push()

    print("Creating tables")
    db.create_all()

    print("Seeding records")
    seed.main()