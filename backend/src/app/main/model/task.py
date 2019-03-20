from .. import db
import time

class Task(db.Model):
    """ Task Model for storing task related details """
    __tablename__ = "task"

    
    id = db.Column(db.Integer , primary_key=True, autoincrement=True)
    description = db.Column(db.String(1024) )
    state_id = db.Column(db.Integer , db.ForeignKey('state.id'))
    owner_id = db.Column(db.Integer , db.ForeignKey('user.id'))
    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

    def __repr__(self):
        return "<Task '{}'>".format(self.name)