from .. import db
import datetime
import time
import enum
from sqlalchemy import Enum

class SeverityLevel(enum.Enum):
    CRITICAL = 1
    MAJOR = 2
    MODERATE = 3
    MINOR = 4
    INSIGNIFICANT = 5
    DEFAULT = 6

class IncidentSeverity(db.Model):
    """ IncidentSeverity Model for storing task related details """
    __tablename__ = "incident_severity"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    level = db.Column(db.Enum(SeverityLevel))
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    created_at = db.Column(db.Integer, default=int(time.time()))

    def __repr__(self):
        return "<IncidentSeverity '{}'>".format(self.level)