from .. import db
import datetime
import enum
from sqlalchemy import Enum

class EventAction(enum.Enum):
    CREATE = 1  
    ATTRIBUTE_CHANGED = 2
    COMMENTED = 3
    MEDIA_ATTACHED = 4

class Event(db.Model):
    """ Event model represents an auditable action done by a system user """
    __tablename__ = "event"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    # action type for the event, refer enums
    action = db.Column(Enum(EventAction))

    # refers to an external entity, ex: comment, media, outcome
    reference_id = db.Column(db.Integer)
    
    # specifies additional details
    description = db.Column(db.String(1024))

    # event intiator - should be a user
    intiator = db.Column(db.String(1024))

    # event approver - should be a user, can be same as initiator
    approver = db.Column(db.String(1024))

    # incident related to the event
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))

    # attribute changed by the current event action
    affected_attribute = db.Column(db.String(1024))
    
    def __repr__(self):
        return "<Event '{}'>".format(self.name)
