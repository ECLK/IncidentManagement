from .. import db
import datetime

class Election(db.Model):
    """ Election Model for storing task related details """
    __tablename__ = "election"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))
    sn_name = db.Column(db.String(1024))
    tm_name = db.Column(db.String(1024))

    def __repr__(self):
        return "<Election '{}'>".format(self.name)