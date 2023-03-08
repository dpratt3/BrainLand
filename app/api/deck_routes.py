from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck, Class, Progress
from flask_login import current_user, login_user, logout_user, login_required

from app.models.brainLand import Card

deck_routes = Blueprint('deck', __name__)

@deck_routes.route('/', methods = ["GET"])
def get_all_decks():
    if current_user.is_authenticated:
        class_id = request.args.get('class_id')
        decks = Deck.query.all()
        
        all_decks = [ deck.to_dict() for deck in decks ] # class is a reserved keyword
        
        if class_id != None:
            all_decks = [deck for deck in all_decks if deck['class_id'] == int(class_id)]
            
    return all_decks

### Edit a deck name for a class that they own
@deck_routes.route('/', methods = ["PUT"])
def edit_deck_name():
    if current_user.is_authenticated:
        updated_deck = request.json
        
        deck_obj = Deck.query.get(updated_deck['id'])
        if not deck_obj:
            return "Deck does not exist (yet)", 404
        
        deck_obj.name = updated_deck['name']
        
        db.session.add(deck_obj)
        db.session.commit()
        
    
    return deck_obj.to_dict()

### Create a deck for a class that they made
@deck_routes.route('/', methods = ["POST"])
def create_decks():
    if current_user.is_authenticated:
        
        data = request.json
        # Verify that user owns class
        class_id = int(data['class_id']) 
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
def delete_deck_by_id(id):
    if current_user.is_authenticated:
        
        deck_obj = Deck.query.get(id)
        
        if not deck_obj: 
            return {"message":  "Deck not found"}, 404 # 401 is unathorized
        
        # Make sure that the user owns the deck in question
        class_id = deck_obj.class_id
        class_obj = Class.query.get(class_id)
        
        if(current_user.id != class_obj.user_id):
            return {"message":  "User does not own class which owns deck"}, 401
    
        list_of_cards = Card.query.filter(Card.deck_id == deck_obj.id).all()
        
        if len(list_of_cards) > 0:
            return {"message": "All cards must be deleted before a deck is deleted"}, 409
        
        # list_of_progress_record = Progress.query.filter(Progress.deck_id == deck_obj.id).all()
        
        # if len(list_of_progress_record) > 0:
        #     return {"message": "Progress records are linked with this deck"}, 409
        
                           
        try: 
            db.session.delete(deck_obj)
            db.session.commit()
        except Exception as e:
            print(e)
            return {"message": "Deck cannot be deleted"}, 500
        
    return "Deck successfully deleted"