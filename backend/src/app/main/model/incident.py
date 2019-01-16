from .. import db
import datetime

class Incident(db.Model):
    """ Incident Model for storing task related details """
    __tablename__ = "incident"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(1024))
    election_id = db.Column(db.Integer, db.ForeignKey('election.id'))
    police_station_id = db.Column(db.Integer, db.ForeignKey('policestation.id'))
    polling_station_id = db.Column(db.Integer, db.ForeignKey('pollingstation.id'))
    reporter_id = db.Column(db.Integer, db.ForeignKey('reporter.id'))
    location = db.Column(db.String(4096))
    channel = db.Column(db.String(4096))
    title = db.Column(db.Text)
    description = db.Column(db.Text)
    sn_title = db.Column(db.Text)
    sn_description = db.Column(db.Text)
    tm_title = db.Column(db.Text)
    tm_description = db.Column(db.Text)
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return "<Incident '{}'>".format(self.name)