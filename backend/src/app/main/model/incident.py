from .. import db
import datetime
from sqlalchemy import Enum
from ..model.occurence import Occurence

class Incident(db.Model):
    """ Incident Model for storing task related details """
    __tablename__ = "incident"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(1024))
    
    # getting the elections from a separate service
    election_id = db.Column(db.Integer)

    police_station_id = db.Column(db.Integer, db.ForeignKey('policestation.id'))
    polling_station_id = db.Column(db.Integer, db.ForeignKey('pollingstation.id'))
    title = db.Column(db.Text)
    description = db.Column(db.Text)
    sn_title = db.Column(db.Text)
    sn_description = db.Column(db.Text)
    tm_title = db.Column(db.Text)
    tm_description = db.Column(db.Text)

    # the occurence flag of the incident - check enums for more details
    occurence = db.Column(Enum(Occurence))
    
    # the person who reported the incident, not ncessarily the one 
    # that entered it to the system
    reporter_id = db.Column(db.Integer, db.ForeignKey('reporter.id'))

    # the medium through which the incident was reported
    channel = db.Column(db.Integer, db.ForeignKey('channel.id'))

    # top-sub category of the incident (ex: violation of law - xxx)
    category = db.Column(db.Integer, db.ForeignKey('category.id'))

    # keeping it as string for now
    location = db.Column(db.String(4096))

    # fields that doesn't make much sense
    timing_nature = db.Column(db.String(1024))
    validity = db.Column(db.String(1024))
    
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return "<Incident '{}'>".format(self.name)