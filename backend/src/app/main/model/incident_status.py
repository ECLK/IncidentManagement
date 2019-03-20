from .. import db
import datetime
import time
import enum
from sqlalchemy import Enum

class StatusType(enum.Enum):
    NEW = 1
    CLOSED = 2
    ACTION_TAKEN = 3
    ACTION_PENDING = 4
    ADVICE_PROVIDED = 5
    ADVICE_REQESTED = 6
    VERIFIED = 7
    

class IncidentStatus(db.Model):
    """ IncidentStatus Model for storing task related details """
    __tablename__ = "incident_status"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status_type = db.Column(db.Enum(StatusType))
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    created_at = db.Column(db.Integer, default=int(time.time()))

    def __repr__(self):
        return "<IncidentStatus '{}'>".format(self.status_type)