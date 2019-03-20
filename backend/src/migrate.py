from manage import make_app, db
import seed

if __name__ == "__main__":
    print("Initializing app")
    app = make_app('dev')
    app.app_context().push()

    print("Creating tables")
    db.create_all()

    print("Seeding records")
    seed.main()