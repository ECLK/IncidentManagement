
from .. import db

class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))
  

    def __repr__(self):
        return "<User '{}'>".format(self.name)
