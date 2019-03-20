from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS, cross_origin
from ..main.middleware.logger import Logger

from .config import config_by_name

app = Flask(__name__)
app.wsgi_app = Logger(app.wsgi_app)
CORS(app)
blueprint = Blueprint('api', __name__)
api = Api(blueprint)
app.register_blueprint(blueprint)

db = SQLAlchemy()

def create_app(config_name):
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    
    return app


