def create_test_app(app, db):
    app.config['TESTING'] = True
    app.config["MYSQL_PATH"] = "mysql://root:toor@localhost/lsf-test"
    # Dynamically bind SQLAlchemy to application
    db.init_app(app)
    app.app_context().push() # this does the binding
    return app, db