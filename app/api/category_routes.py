from flask import Blueprint, jsonify, session, request
from app.models import User, db, Category, Class, CategoryClass
from flask_login import current_user, login_user, logout_user, login_required

category_routes = Blueprint('category', __name__)

### get all decks
@category_routes.route('/', methods = ["GET"])
def get_all_categories():
    if current_user.is_authenticated:
        categories = Category.query.all()
    all_categories = [category.to_dict() for category in categories]
    return all_categories

### Delete a category by id
# @category_routes.route('/<int:id>', methods = ["DELETE"])
# def delete_deck_by_id(id):
#     if current_user.is_authenticated:
#         classes = Class.query.filter(Class.user_id == 1).all()
#         print(classes)
#         categoriesClasses = CategoryClass.query.filter().all()
#         categories = Category.query.filter().all()
        
#         print(classes)
#         current_user.id
#     return 'Hello world'