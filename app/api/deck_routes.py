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

### create a deck for a class that they made
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
            return "Deck not found", 401 # 401 is unathorized
        
        # Make sure that the user owns the deck in question
        # class_id = deck_obj.class_id
        # class_obj = Class.query.get(class_id)
        
        # print(class_obj.user_id, "<------------------------- user id")
        # if(current_user.id != class_obj.user_id):
        #     return "User does not own class which owns deck", 401
                   
        try: 
            db.session.delete(deck_obj)
            db.session.commit()
        except:
            return "Deck cannot be deleted"
        
    return "Deck successfully deleted"