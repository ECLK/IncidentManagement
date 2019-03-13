from .. import db
import time

class Channel(db.Model):
    """ Channel Model for storing task related details """
    __tablename__ = "channel"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))
    
    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

    def __repr__(self):
        return "<Channel '{}'>".format(self.name)
