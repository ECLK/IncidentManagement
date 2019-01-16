from .. import db
import datetime

class Reporter(db.Model):
    """ Reporter Model for storing task related details """
    __tablename__ = "reporter"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))
    sn_name = db.Column(db.String(1024))
    tm_name = db.Column(db.String(1024))
    type = db.Column(db.String(1024))

    def __repr__(self):
        return "<Reporter '{}'>".format(self.name)