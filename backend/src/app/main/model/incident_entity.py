from .. import db
import datetime

class IncidentEntity(db.Model):
    """ IncidentEntity Model for storing task related details """
    __tablename__ = "incident_entity"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    entity_id = db.Column(db.Integer, db.ForeignKey('action_entity.id'))
    description = db.Column(db.Text)
    sn_description = db.Column(db.Text)
    tn_description = db.Column(db.Text)
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return "<IncidentEntity '{}'>".format(self.name)