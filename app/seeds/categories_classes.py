from app.models import db, CategoryClass, environment, SCHEMA


def seed_categories_classes():
    # cat 1 is anatomy
    cat_class1 = CategoryClass(class_id = 1, category_id = 1)
    cat_class2 = CategoryClass(class_id = 2, category_id = 1)
    cat_class3 = CategoryClass(class_id = 3, category_id = 1)
    cat_class4 = CategoryClass(class_id = 4, category_id = 1)
    cat_class5 = CategoryClass(class_id = 5, category_id = 1)
    cat_class6 = CategoryClass(class_id = 6, category_id = 1)
    cat_class7 = CategoryClass(class_id = 7, category_id = 1)
    cat_class8 = CategoryClass(class_id = 8, category_id = 1)
    cat_class9 = CategoryClass(class_id = 9, category_id = 1)
    cat_class10 = CategoryClass(class_id = 10, category_id = 1)
    cat_class11 = CategoryClass(class_id = 11, category_id = 1)
    cat_class12 = CategoryClass(class_id = 12, category_id = 1)
    cat_class13 = CategoryClass(class_id = 13, category_id = 1)
    cat_class14 = CategoryClass(class_id = 14, category_id = 1)
    cat_class15 = CategoryClass(class_id = 15, category_id = 1)
    cat_class16 = CategoryClass(class_id = 16, category_id = 1)
    cat_class17 = CategoryClass(class_id = 17, category_id = 1)
    cat_class18 = CategoryClass(class_id = 18, category_id = 1)
    cat_class19 = CategoryClass(class_id = 19, category_id = 1)
    cat_class20 = CategoryClass(class_id = 20, category_id = 1)
    cat_class21 = CategoryClass(class_id = 21, category_id = 1)
    
    db.session.add(cat_class1) 
    db.session.add(cat_class3) 
    db.session.add(cat_class4) 
    db.session.add(cat_class2) 
    db.session.add(cat_class5) 
    db.session.add(cat_class6) 
    db.session.add(cat_class7) 
    db.session.add(cat_class8) 
    db.session.add(cat_class9) 
    db.session.add(cat_class10)
    db.session.add(cat_class11)
    db.session.add(cat_class12)
    db.session.add(cat_class13)
    db.session.add(cat_class14)
    db.session.add(cat_class15)
    db.session.add(cat_class16)
    db.session.add(cat_class17)
    db.session.add(cat_class18)
    db.session.add(cat_class19)
    db.session.add(cat_class20)
    db.session.add(cat_class21)
    
    #don't forget to add
    db.session.commit()
    
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories_classes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.category_class RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM category_class")
        
    db.session.commit()