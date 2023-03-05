from flask import Blueprint, jsonify, session, request
from app.models import User, db, Card, Deck, Class
from flask_login import current_user, login_user, logout_user, login_required

card_routes = Blueprint('card', __name__)

@card_routes.route('/', methods = ["GET"])
def get_all_cards():
    if current_user.is_authenticated:
        cards = Card.query.all()
    
    deck_id = request.args.get('deck_id')
    all_cards = [card.to_dict() for card in cards]
    
    if deck_id != None:
        all_cards = [card for card in all_cards if card['deck_id'] == int(deck_id)]   
        
    
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
        
    
    return new_card.to_dict()


# update card
@card_routes.route('/', methods = ["PUT"])
def update_card():
    if current_user.is_authenticated:
        updated_card = request.json
        
        deck_obj = Deck.query.get(updated_card['deck_id'])
        if not deck_obj:
            return "Deck does not exist (yet)", 404
        
        card_obj = Card.query.get(updated_card['id'])
        if not card_obj:
            return "Card does not exist (yet) with given id", 404
        
        # User must own the class that owns the deck
        class_id = deck_obj.class_id
        class_obj = Class.query.get(class_id)
         
        if class_obj.user_id != current_user.id:
            return "User does not own class that owns deck", 401
    
        card_obj.card_question = updated_card['card_question']
        card_obj.card_answer= updated_card['card_answer']
        
        db.session.add(card_obj)
        db.session.commit()
        
    
    return card_obj.to_dict()
        
### Delete a card by id (for a deck that they own)
# post a card to a deck that they own
@card_routes.route('/<int:card_id>', methods = ["DELETE"])
def delete_card(card_id):
    if current_user.is_authenticated:
         
        # Note: user must own the class that owns the deck that owns the card-to-be-deleted
        
        # from card id, get deck id
        card = Card.query.filter(Card.id == card_id).all()
        if not card:
            return 'Card does not exist', 404
        
        card_obj = card[0]
        
        deck_id = card_obj.deck_id
         
        deck_obj = Deck.query.get(deck_id)
        if not deck_obj:
            return "Deck does not exist (yet)", 404
        
        # User must own the class that owns the deck
        class_id = deck_obj.class_id
        class_obj = Class.query.get(class_id)
         
        if class_obj.user_id != current_user.id:
            return "User does not own class that owns deck that owns card", 401
        
        try: 
            db.session.delete(card_obj)
            db.session.commit()
        except:
            return "Card cannot be deleted"
        
    return 'Card successfully deleted'  
         