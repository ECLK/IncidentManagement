from .. import db
import datetime

class IncidentOutcome(db.Model):
    """ IncidentOutcome Model for storing task related details """
    __tablename__ = "incident_outcome"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    type = db.Column(db.String(1024))
    title = db.Column(db.String(1024))
    sn_title = db.Column(db.String(1024))
    tm_title = db.Column(db.String(1024))
    description = db.Column(db.Text)
    sn_description = db.Column(db.Text)
    tn_description = db.Column(db.Text)
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return "<IncidentOutcome '{}'>".format(self.name)