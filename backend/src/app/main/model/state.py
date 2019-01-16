
from .. import db

class State(db.Model):
    """ State Model for storing state related details """
    __tablename__ = "state"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Enum('Backlog', 'To Do', 'In Progress', 'Testing', 'Done', 'Archived'), unique=True)
  

    def __repr__(self):
        return "<State '{}'>".format(self.name)
