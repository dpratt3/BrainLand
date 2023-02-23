from .db import db, environment, SCHEMA, add_prefix_for_prod
from .db import add_prefix_for_prod

class Class(db.Model):
    __tablename__ = "class"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id
    }

class Category(db.Model):
    __tablename__ = "category"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable = False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
    }

class CategoryClass(db.Model):
    __tablename__ = "category_class"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('class.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('category.id')), nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "class_id": self.class_id,
            "category_id": self.category_id
    }

        
class Deck(db.Model):
    __tablename__ = "deck"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable = False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('class.id')), nullable=False)
    
    # cards = db.Relationship("Cards", backref = db.backref("deck", lazy = True))
    # progress = db.Relationship("Progress", backref = db.backref("deck", lazy = True))  
    # created_at placeholder
    # updated_at placeholder
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "class_id": self.class_id,
            "cards": self.cards,
            "progress": self.progress
    }

class Card(db.Model):
    __tablename__ = "cards"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('deck.id')), nullable=False)
    card_question = db.Column(db.String(255), nullable = False)
    card_answer = db.Column(db.String(255), nullable = False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "deck_id": self.deck_id,
            "card_question": self.card_question,
            "card_answer": self.card_answer,
    }


class Progression(db.Model):
    __tablename__ = "progress"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('deck.id')), nullable=False)
    progress_score = db.Column(db.Integer, nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "deck_id": self.deck_id,
            "progress_score": self.progress_score
    }
