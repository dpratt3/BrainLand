from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Class
from flask_login import current_user, login_user, logout_user, login_required

deck_routes = Blueprint('deck', __name__)

@deck_routes.route('/', methods = ["GET"])
def get_all_decks():
    if current_user.is_authenticated:
    
        decks = Deck.query.all()
    
    all_decks = [ deck.to_dict()['name'] for deck in decks ] # class is a reserved keyword
    
    return all_decks

### Edit a deck name for a class that they own
@deck_routes.route('/<int:id>', methods = ["PUT"])
def edit_deck_name(id):
    if current_user.is_authenticated:
        deck_obj = Deck.query.get(id)
        if not deck_obj:
            return "Deck does not exist (yet)", 404
        
        data = request.json
        
        # User must own the class that owns the deck
        class_id = deck_obj.class_id
        class_obj = Class.query.get(class_id)
         
        if class_obj.user_id != current_user.id:
            return "User does not own class", 401
        
        # block user from being allowed to assign decks to classes they don't own
        id = current_user.id
        owned_classes = Class.query.filter(Class.user_id == id).all()
        owned_class_ids = [class_var.user_id for class_var in owned_classes]
        if data['class_id'] not in owned_class_ids:
            return "User cannot assign deck to class that they don't own"
        
        print(owned_class_ids, "<--------------------------------")
        
        # change name of deck and class id
        deck_obj.name = data['name']
        deck_obj.class_id = data['class_id']
                
        db.session.add(deck_obj)
        db.session.commit()
        
        result = {
            "id": deck_obj.id,
            "name": deck_obj.name,
            "class_id": deck_obj.class_id
        }
    
    return result

### Create a deck for a class that they made
@deck_routes.route('/', methods = ["POST"])
def create_decks():
    if current_user.is_authenticated:
        
        data = request.json
        
        # Verify that user owns class
        class_id = data['class_id'] 
        class_obj = Class.query.get(class_id)
        if(class_obj.user_id != current_user.id):
            return "User does not own class", 401
        
        new_deck = Deck(
            name = data['name'],
            class_id = class_id 
        )
        
        db.session.add(new_deck)
        db.session.commit()
        
        result = {
            "id": new_deck.id,
            "name": new_deck.name,
            "class_id": new_deck.class_id
        }
    
    return result

### Delete a deck from a class that they own
@deck_routes.route('/<int:id>', methods = ["DELETE"])
def delete_class_by_id(id):
    if current_user.is_authenticated:
        deck_obj = Deck.query.get(id)
        
        if not deck_obj: 
            return "Deck not found", 404 # 401 is unathorized
        
        # Make sure that the user owns the deck in question
        class_id = deck_obj.class_id
        class_obj = Class.query.get(class_id)
        
        if(current_user.id != class_obj.user_id):
            return "User does not own class which owns deck", 401
                   
        try: 
            db.session.delete(deck_obj)
            db.session.commit()
        except:
            return "Deck cannot be deleted"
        
    return "Deck successfully deleted"