from app.models import db, Category, environment, SCHEMA

def seed_categories():
    cat1 = Category(name = "Anatomy")
    cat2 = Category(name = "Astronomy")    
    cat3 = Category(name = "Biochemistry")
    cat4 = Category(name = "Biology")
    cat5 = Category(name = "Cellular Biology")
    cat6 = Category(name = "Chemistry")
    cat7 = Category(name = "Earth Science")
    cat8 = Category(name = "Environmental Science") 
    cat9 = Category(name = "Genetics")
    
    db.session.add(cat1)
    db.session.add(cat2)
    db.session.add(cat3)
    db.session.add(cat4)
    db.session.add(cat5)
    db.session.add(cat6) 
    db.session.add(cat7)
    db.session.add(cat8)
    db.session.add(cat9)
       
    db.session.commit()
    
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.category RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM category")
        
    db.session.commit()