from .. import db
import datetime

class Role(db.Model):
    """ Role Model for storing task related details """
    __tablename__ = "role"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    entiry_id = db.Column(db.Integer, db.ForeignKey('action_entity.id'))
    name = db.Column(db.String(1024))
    sn_name = db.Column(db.String(1024))
    tm_name = db.Column(db.String(1024))

    def __repr__(self):
        return "<Role '{}'>".format(self.name)