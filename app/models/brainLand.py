from .db import db, environment, SCHEMA, add_prefix_for_prod
from .db import add_prefix_for_prod

# start with joins table
class CategoriesClasses(db.Model):
    __tablename__ = "category_class"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('class.id')), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('category.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "class_id": self.class_id
            "category_id": self.category_id
            "user_id": self.user_id
    }

class Classes(db.Model):
    __tablename__ = "class"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullalble = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
            "user_id": self.user_id
    }
        
class Categories(db.Model):
    __tablename__ = "category"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullalble = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
            "user_id": self.user_id
    }

class Decks(db.Model):
    __tablename__ = "deck"
    
    if environment == "production":
        __table_args__ = (db.UniqueConstraint(
            'question_id', 'tag_id'), {'schema': SCHEMA})
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullalble = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('class.id')), nullable=False)
    # created_at placeholder
    # updated_at placeholder
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
            "user_id": self.user_id
            "class_id": self.user_id
    }

class Progressions(db.Model):
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
            "name": self.name
            "user_id": self.user_id
            "deck_id": self.deck_id
            "progress_score": self.progress_score
    }

class Cards(db.Model):
    __tablename__ = "progress"
    
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
            "deck_id": self.deck_id
            "card_question": self.card_question
            "card_answer": self.card_answer
    }
        
# # start with joins table

# class DatasetPackage(db.Model):
    
#     __tablename__ = 'dataset_package'

#     if environment == "production":
#         __table_args__ = (db.UniqueConstraint(
#             'question_id', 'tag_id'), {'schema': SCHEMA})
    
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     pkg_key = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('package.id')), nullable=False)
#     data_key = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('dataset.id')), nullable=False)
#     table_name = db.Column(db.String(50))
    
#     user = db.relationship('User', backref=db.backref('datasetpackage', lazy=True))
#     package = db.relationship('Package', backref=db.backref('datasetpackage', lazy=True))
#     dataset = db.relationship('Dataset', backref=db.backref('datasetpackage', lazy=True))
    
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "pkg_key": self.pkg_key,
#             "data_key": self.data_key,
#             "table_name": self.table_name
#         }

# class Package(db.Model):
    
#     __tablename__ = 'package'

#     if environment == "production":
#         __table_args__ = (db.UniqueConstraint(
#             'question_id', 'tag_id'), {'schema': SCHEMA})
        
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(255))
#     links = db.Column(db.String(255))
#     date_modified = db.Column(db.String(20))
    
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "links": self.links,
#             "date_modified": self.date_modified
#         }
    
# class Dataset(db.Model):
#     __tablename__ = 'dataset'

#     if environment == "production":
#         __table_args__ = (db.UniqueConstraint(
#             'question_id', 'tag_id'), {'schema': SCHEMA})
        
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50))
#     date_modified = db.Column(db.String(20))    
    
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "date_modified": self.date_modified
#         }