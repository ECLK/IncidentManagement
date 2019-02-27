from .. import db
import datetime

class Channel(db.Model):
    """ Channel Model for storing task related details """
    __tablename__ = "channel"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))

    def __repr__(self):
        return "<Channel '{}'>".format(self.name)