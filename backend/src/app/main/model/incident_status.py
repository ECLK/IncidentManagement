from .. import db
import datetime

class IncidentStatus(db.Model):
    """ IncidentStatus Model for storing task related details """
    __tablename__ = "incident_status"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))
    detail = db.Column(db.Text)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    executed_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return "<IncidentStatus '{}'>".format(self.name)