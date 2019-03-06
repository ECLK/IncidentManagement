from .. import db
import time

class Reporter(db.Model):
    """ Reporter Model for storing task related details """
    __tablename__ = "reporter"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))
    sn_name = db.Column(db.String(1024))
    tm_name = db.Column(db.String(1024))
    type = db.Column(db.String(1024))
    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

    def __repr__(self):
        return "<Reporter '{}'>".format(self.name)