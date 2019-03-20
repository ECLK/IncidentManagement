from .. import db
import time

class District(db.Model):
    """ District Model for storing task related details """
    __tablename__ = "district"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(1024))
    province = db.Column(db.String(1024))
    sn_name = db.Column(db.String(1024))
    sn_province = db.Column(db.String(1024))
    tm_name = db.Column(db.String(1024))
    tm_province = db.Column(db.String(1024))

    created_date = db.Column(db.Integer, default=int(time.time()))
    updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

    def __repr__(self):
        return "<District '{}'>".format(self.name)
