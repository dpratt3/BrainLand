from flask import Blueprint, jsonify, session, request
from app.models import User, db, Card
from flask_login import current_user, login_user, logout_user, login_required

card_routes = Blueprint('card', __name__)

@card_routes.route('/', methods = ["GET"])
def get_all_cards():
    if current_user.is_authenticated:
        cards = Card.query.all()
    #print((cards[0].to_dict()))
    all_cards = [card.to_dict() for card in cards]
    return {"Cards": all_cards}