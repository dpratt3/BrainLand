from flask import Blueprint, jsonify, session, request
from app.models import User, db, Class
from flask_login import current_user, login_user, logout_user, login_required

class_routes = Blueprint('class', __name__)

@class_routes.route('/', methods = ["GET"])
def get_all_classes():
    if current_user.is_authenticated:
    
        classes = Class.query.all()
    
    all_classes = [ class_var.to_dict() for class_var in classes ] # class is a reserved keyword
    
    return {"All Classes": all_classes}