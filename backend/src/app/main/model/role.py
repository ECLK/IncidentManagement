from .. import db
import datetime

class Role(db.Model):
    """ District Model for storing task related details """
    __tablename__ = "role"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(1024))

    def __repr__(self):
        return "<Role '{}'>".format(self.title)