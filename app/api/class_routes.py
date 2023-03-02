from flask import Blueprint, jsonify, session, request
from app.models import User, db, Class, CategoryClass
from flask_login import current_user, login_user, logout_user, login_required

class_routes = Blueprint('class', __name__)

### get all classes
@class_routes.route('/', methods = ["GET"])
def get_all_classes():
    if current_user.is_authenticated:
    
        classes = Class.query.all()
    
    all_classes = [ class_var.to_dict() for class_var in classes ] # class is a reserved keyword
    
    return all_classes

### create a class
@class_routes.route('/', methods = ["POST"])
def create_classes():
    if current_user.is_authenticated:
        
        data = request.json

        new_class = Class(
            name = data['className'],
            user_id = current_user.id # data['user_id']
        )
        
        db.session.add(new_class)
        db.session.commit()
        
        result = {
            "id": new_class.id,
            "name": new_class.name,
            "user_id": new_class.user_id
        }
    
    return result

## delete a class
@class_routes.route('/<int:id>', methods = ["DELETE"])
def delete_class_by_id(id):
    if current_user.is_authenticated:
        class_obj = Class.query.get(id)
        
        if not class_obj: 
            return "Class not found", 401 # 401 is unathorized

        if class_obj.user_id != current_user.id:
            return "User does not own class", 404
        
        # Delete the category class association when the class is deleted    
        try:
            category_classes = CategoryClass.query.filter(CategoryClass.class_id == id).all()
            print(category_classes)
            cat_class = category_classes[0]
            db.session.delete(cat_class)
            db.session.commit()
        except:
            pass # continue if there's not category-class relationship
        
        try: 
            db.session.delete(class_obj)
            db.session.commit()
        except:
            return "Class cannot be deleted"
        
    return "Class successfully deleted"