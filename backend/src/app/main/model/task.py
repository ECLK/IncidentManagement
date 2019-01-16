from .. import db
import datetime

class Task(db.Model):
    """ Task Model for storing task related details """
    __tablename__ = "task"

    
    id = db.Column(db.Integer , primary_key=True, autoincrement=True)
    description = db.Column(db.String )
    state_id = db.Column(db.Integer , db.ForeignKey('state.id'))
    owner_id = db.Column(db.Integer , db.ForeignKey('user.id'))
    created_date = db.Column(db.DateTime , default=datetime.datetime.utcnow)
    updated_date = db.Column(db.DateTime , default=datetime.datetime.utcnow)

    def __repr__(self):
        return "<Task '{}'>".format(self.name)