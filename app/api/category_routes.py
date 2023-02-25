from flask import Blueprint, jsonify, session, request
from app.models import User, db, Category
from flask_login import current_user, login_user, logout_user, login_required

category_routes = Blueprint('category', __name__)

@category_routes.route('/', methods = ["GET"])
def get_all_categories():
    if current_user.is_authenticated:
        categories = Category.query.all()
    #print((cards[0].to_dict()))
    all_categories = [category.to_dict() for category in categories]
    return {"Cards": all_categories}