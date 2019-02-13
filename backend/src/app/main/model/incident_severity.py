from .. import db
import datetime

class IncidentSeverity(db.Model):
    """ IncidentSeverity Model for storing task related details """
    __tablename__ = "incident_severity"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    level = db.Column(db.String(1024))
    detail = db.Column(db.Text)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    executed_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return "<IncidentSeverity '{}'>".format(self.name)