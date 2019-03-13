from .. import db
import time

class PollingStation(db.Model):
    """ PollingStation Model for storing task related details """
    __tablename__ = "pollingstation"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    district_id = db.Column(db.Integer, db.ForeignKey('district.id'))
    name = db.Column(db.String(1024))
    division = db.Column(db.String(1024))
    sn_name = db.Column(db.String(1024))
    sn_division = db.Column(db.String(1024))
    tm_name = db.Column(db.String(1024))
    tm_division = db.Column(db.String(1024))
    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

    def __repr__(self):
        return "<PollingStation '{}'>".format(self.name)