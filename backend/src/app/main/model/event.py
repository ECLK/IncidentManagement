from .. import db
import time
import enum
from sqlalchemy import Enum

class EventAction(enum.Enum):
    CREATED = 1  
    GENERIC_UPDATE = 2
    ATTRIBUTE_CHANGE_REQUESTED = 3
    ATTRIBUTE_CHANGED = 4
    ATTRIBUTE_CHANGE_REJECTED = 5
    COMMENTED = 6
    MEDIA_ATTACHED = 7

class AffectedAttribute(enum.Enum):
    STATUS = 1  
    SEVERITY = 2
    OUTCOME = 3

class Event(db.Model):
    """ Event model represents an auditable action done by a system user """
    __tablename__ = "event"

    # id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id = db.Column(db.String(36), primary_key=True)
    
    # action type for the event, refer enums
    action = db.Column(db.Enum(EventAction))

    # refers to an external entity, ex: comment, media, outcome
    reference_id = db.Column(db.Integer)
    
    # refers to an event linked to the current event i.e for an ATTRIBUTE_CHANGED 
    # event or an ATTRIBUTE_CHANGE_REJECTED event previously occured 
    # ATTRIBUTE_CHANGE_REQUESTED event's id
    linked_event_id = db.Column(db.Integer)

    # specifies additional details
    description = db.Column(db.String(1024))

    # event intiator - should be a user
    intiator = db.Column(db.String(1024))

    # incident related to the event
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))

    # attribute changed by the current event action
    affected_attribute = db.Column(db.Enum(AffectedAttribute))

    created_date = db.Column(db.Integer, default=int(time.time()))
    approved_date = db.Column(db.Integer, default=int(time.time()))

    def to_dict(self):
        d = {}
        for column in self.__table__.columns:
            value = getattr(self, column.name)
            
            if value is not None:
                if column.name in ["action", "affected_attribute"]:
                    value = value.name

            d[column.name] = value

        return d
    
    def __repr__(self):
        return "<Event '{}'>".format(self.id)
