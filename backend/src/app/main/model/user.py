# from .. import db
# import time
import enum

# class User(db.Model):
#     """ User Model for storing task related details """
#     __tablename__ = "user"

    
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
#     name = db.Column(db.String(1024))
#     sn_name = db.Column(db.String(1024))
#     tm_name = db.Column(db.String(1024))
#     created_date = db.Column(db.Integer, default=int(time.time()))
#     updated_date = db.Column(db.Integer, default=int(time.time()), onupdate=int(time.time()))

#     def __repr__(self):
#         return "<User '{}'>".format(self.name)

class PermissionLevel(enum.Enum):
    NOT_ALLOWED = 1  
    ALLOWED_WITH_APPROVAL = 2
    ALLOWED = 3
