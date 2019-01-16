import datetime

from app.main import db
from app.main.model.comment import Comment


def save_new_comment(data):
    new_comment = Comment()
    try:
        new_comment.body = data['body'],
    except KeyError:
        pass
    try:
        new_comment.sn_body = data['sn_body'],
    except KeyError:
        pass
    try:
        new_comment.tm_body = data['tm_body'],
    except KeyError:
        pass
    try:
        new_comment.user_id = data['user_id'],
    except KeyError:
        pass
    try:
        new_comment.role_id = data['role_id'],
    except KeyError:
        pass
    try:
        new_comment.is_active = data['is_active'],
    except KeyError:
        pass
    try:
        new_comment.created_date = data['created_date'],
    except KeyError:
        pass
    try:
        new_comment.updated_date = data['updated_date'],
    except KeyError:
        pass
    try:
        new_comment.deleted_date = data['deleted_date'],
    except KeyError:
        pass
    
    save_changes(new_comment)
    response_object = {
        'status': 'success',
        'message': 'Successfully created comment.',
    }
    return response_object, 201

def get_all_comments():
    return Comment.query.all()

def get_a_comment(id):
    return Comment.query.filter_by(id=id).first()

def get_comments_by_user(user_id):
    return Comment.query.filter_by(user_id=user_id).all()

def get_comments_by_role(role_id):
    return Comment.query.filter_by(role_id=role_id).all()

def delete_a_comment(id):
    comment = Comment.query.filter_by(id=id).all()
    if not comment:
        response_object = {
            'status': 'fail',
            'message': 'Comment with id ' + id + ' does not exist.',
        }
        return response_object, 409
    else:
        db.session.delete(comment)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted comment with id ' + id + '.',
        }
        return response_object, 201

def edit_a_comment(id, data):
    comment = Comment.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        new_comment.body = data['body'],
    except KeyError:
        pass
    try:
        new_comment.sn_body = data['sn_body'],
    except KeyError:
        pass
    try:
        new_comment.tm_body = data['tm_body'],
    except KeyError:
        pass
    try:
        new_comment.is_active = data['is_active'],
    except KeyError:
        pass
    try:
        new_comment.updated_date = data['updated_date'],
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated comment.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to update in the comment.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

