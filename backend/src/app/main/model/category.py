from .. import db
import datetime

class Category(db.Model):
    """ Category Model for storing task related details """
    __tablename__ = "category"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    top_category = db.Column(db.String(1024))
    sub_category = db.Column(db.String(1024))
    sn_top_category = db.Column(db.String(1024))
    sn_sub_category = db.Column(db.String(1024))
    tm_top_category = db.Column(db.String(1024))
    tm_sub_category = db.Column(db.String(1024))

    def __repr__(self):
        return "<Category '{}'>".format(self.name)