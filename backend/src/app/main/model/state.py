
from .. import db
import time

class State(db.Model):
    """ State Model for storing state related details """
    __tablename__ = "state"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Enum('Backlog', 'To Do', 'In Progress', 'Testing', 'Done', 'Archived'), unique=True)
    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))  

    def __repr__(self):
        return "<State '{}'>".format(self.name)
