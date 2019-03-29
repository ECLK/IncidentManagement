from .. import db
import datetime
import time

class IncidentComment(db.Model):
    """ IncidentComment Model for storing task related details """
    __tablename__ = "incident_comment"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))
    body = db.Column(db.Text)
    sn_body = db.Column(db.Text)
    tm_body = db.Column(db.Text)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    user_id = db.Column(db.String(1024))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    is_active = db.Column(db.Boolean)
    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

    def __repr__(self):
        return "<IncidentComment '{}'>".format(self.name)