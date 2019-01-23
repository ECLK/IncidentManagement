from .. import db
import datetime

class IncidentMedia(db.Model):
    """ IncidentMedia Model for storing task related details """
    __tablename__ = "incident_media"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    file_name = db.Column(db.String(1024))
    url = db.Column(db.String(1024))
    incident_id = db.Column(db.Integer, db.ForeignKey('incident.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    is_active = db.Column(db.Boolean)
    created_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    deleted_date = db.Column(db.DateTime)

    def __repr__(self):
        return "<IncidentMedia '{}'>".format(self.name)