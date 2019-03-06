from .. import db
import time

class ActionEntity(db.Model):
    """ ActionEntity Model for storing task related details """
    __tablename__ = "action_entity"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column(db.String(1024))
    category = db.Column(db.String(1024))
    name = db.Column(db.String(1024))
    description = db.Column(db.Text)
    sn_name = db.Column(db.String(1024))
    sn_description = db.Column(db.Text)
    tn_name = db.Column(db.String(1024))
    tn_description = db.Column(db.Text)
    created_date = db.Column(db.Integer, default=int(time.time()))

    def __repr__(self):
        return "<ActionEntity '{}'>".format(self.name)