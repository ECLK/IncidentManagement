from .. import db
import datetime

class ActionEntity(db.Model):
    """ ActionEntity Model for storing task related details """
    __tablename__ = "action_entity"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column(db.String(1024))
    name = db.Column(db.String(1024))
    sn_name = db.Column(db.String(1024))
    tm_name = db.Column(db.String(1024))

    def __repr__(self):
        return "<ActionEntity '{}'>".format(self.name)