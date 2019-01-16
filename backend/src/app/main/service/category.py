import datetime

from app.main import db
from app.main.model.category import Category


def save_new_category(data):
    new_category = Category()
    try:
        new_category.top_category = data['top_category'],
    except KeyError:
        pass
    try:
        new_category.sub_category = data['sub_category'],
    except KeyError:
        pass
    try:
        new_category.sn_top_category = data['sn_top_category'],
    except KeyError:
        pass
    try:
        new_category.sn_sub_category = data['sn_sub_category'],
    except KeyError:
        pass
    try:
        new_category.tm_top_category = data['tm_top_category'],
    except KeyError:
        pass
    try:
        new_category.tm_sub_category = data['tm_sub_category'],
    except KeyError:
        pass
    
    save_changes(new_category)
    response_object = {
        'status': 'success',
        'message': 'Successfully created category.',
    }
    return response_object, 201

def get_all_categorys():
    return Category.query.all()

def get_a_category(id):
    return Category.query.filter_by(id=id).first()

def delete_a_category(id):
    category = Category.query.filter_by(id=id).first()
    if not category:
        response_object = {
            'status': 'fail',
            'message': 'Category with id ' + id + ' does not exists.',
        }
        return response_object, 409
    else:
        db.session.delete(category)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully deleted category with id ' + id + '.',
        }
        return response_object, 201

def update_a_category(id, data):
    category = Category.query.filter_by(id = id).first()
    status = 'none'
    SUCESS = 'success'
    try:
        category.top_category = data['top_category']
        status = SUCESS
    except KeyError:
        pass
    try:
        category.sub_category = data['sub_category']
        status = SUCESS
    except KeyError:
        pass
    try:
        category.sn_top_category = data['sn_top_category']
        status = SUCESS
    except KeyError:
        pass
    try:
        category.sn_sub_category = data['sn_sub_category']
        status = SUCESS
    except KeyError:
        pass
    try:
        category.tm_top_category = data['tm_top_category']
        status = SUCESS
    except KeyError:
        pass
    try:
        category.tm_sub_category = data['tm_sub_category']
        status = SUCESS
    except KeyError:
        pass
    
    if status == SUCESS:
        db.session.commit()
        response_object = {
            'status': SUCESS,
            'message': 'Successfully updated category.',
        }
    else:
        response_object = {
            'status': 'none',
            'message': 'Nothing to updated in category.',
        }
    return response_object, 201

def save_changes(data):
    db.session.add(data)
    db.session.commit()

