from flask import Blueprint, jsonify, session, request
from app.models import User, db, Deck
from flask_login import current_user, login_user, logout_user, login_required

deck_routes = Blueprint('deck', __name__)

@deck_routes.route('/', methods = ["GET"])
def get_all_decks():
    if current_user.is_authenticated:
    
        decks = Deck.query.all()
    
    all_decks = [ deck.to_dict()['name'] for deck in decks ] # class is a reserved keyword
    
    return {"All Decks": all_decks}