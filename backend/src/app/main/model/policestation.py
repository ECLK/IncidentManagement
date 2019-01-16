from .. import db
import datetime

class PoliceStation(db.Model):
    """ PoliceStation Model for storing task related details """
    __tablename__ = "policestation"

    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    district_id = db.Column(db.Integer, db.ForeignKey('district.id'))
    name = db.Column(db.String(1024))
    division = db.Column(db.String(1024))
    sn_name = db.Column(db.String(1024))
    sn_division = db.Column(db.String(1024))
    tm_name = db.Column(db.String(1024))
    tm_division = db.Column(db.String(1024))

    def __repr__(self):
        return "<PoliceStation '{}'>".format(self.name)