from flask import Blueprint, jsonify, session, request
from app.models import User, db, Card, Deck, Class
from flask_login import current_user, login_user, logout_user, login_required

card_routes = Blueprint('card', __name__)

@card_routes.route('/', methods = ["GET"])
def get_all_cards():
    if current_user.is_authenticated:
        cards = Card.query.all()

    all_cards = [card.to_dict() for card in cards]
    return all_cards

# post a card to a deck that they own
@card_routes.route('/', methods = ["POST"])
def post_new_card():
    if current_user.is_authenticated:
        data = request.json
        
        deck_obj = Deck.query.get(data['deck_id'])
        if not deck_obj:
            return "Deck does not exist (yet)", 404
        
        # User must own the class that owns the deck
        class_id = deck_obj.class_id
        class_obj = Class.query.get(class_id)
         
        if class_obj.user_id != current_user.id:
            return "User does not own class that owns deck", 401
        
        new_card = Card(
            deck_id = data['deck_id'],
            card_question = data['card_question'],
            card_answer = data['card_answer']      
        )
        
        db.session.add(new_card)
        db.session.commit()
        
        result = {
            "id": new_card.id,
            "card_question": new_card.card_question,
            "card_answer": new_card.card_answer
        }
    
    return result
        
        