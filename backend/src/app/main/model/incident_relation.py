from .. import db
import time

class IncidentRelation(db.Model):
    """ IncidentRelation Model for storing task related details """
    __tablename__ = "incident_relation"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    incident1_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    incident2_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    relationship = db.Column(db.Text)
    description = db.Column(db.Text)
    sn_description = db.Column(db.Text)
    tn_description = db.Column(db.Text)
    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

    def __repr__(self):
        return "<IncidentRelation '{}'>".format(self.name)