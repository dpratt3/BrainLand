from app.models import db, Class, environment, SCHEMA
  
def seed_classes():
    # From Find Flashcards: Anatomy 
    class1 = Class(name = "Anatomy", user_id = 1)
    class2 = Class(name = "Appendicular Skeleton", user_id = 1)
    class3 = Class(name = "Axial Skeleton", user_id = 1)
    class4 = Class(name = "Back Anatomy", user_id = 1)
    class5 = Class(name = "Cardiac Anatomy", user_id = 1)
    class6 = Class(name = "Craniofacial", user_id = 1)
    class7 = Class(name = "Dental Anatomy", user_id = 1)
    class8 = Class(name = "Ear Nose Throat", user_id = 2)
    class9 = Class(name = "Facial Muscles", user_id = 2)
    class10 = Class(name = "Female Pelvis", user_id = 2)
    class11 = Class(name = "Female Reproductive System", user_id = 2)
    class12 = Class(name = "Gross Anatomy", user_id = 2)
    class13 = Class(name = "Head Neck Anatomy", user_id = 2)
    class14 = Class(name = "Lower Limb Anatomy", user_id = 3)
    class15 = Class(name = "Male Reproductive System", user_id = 3)
    class16 = Class(name = "Microanatomy", user_id = 3)
    class17 = Class(name = "Muscles Of Facial Expression", user_id = 3)
    class18 = Class(name = "Neuroanatomy", user_id = 3)
    class19 = Class(name = "Spinal Anatomy", user_id = 3)
    class20 = Class(name = "Thorax Anatomy", user_id = 3)
    class21 = Class(name = "Upper Limb Anatomy", user_id = 3)

    db.session.add(class1)
    db.session.add(class1) 
    db.session.add(class2) 
    db.session.add(class3) 
    db.session.add(class4)  
    db.session.add(class5) 
    db.session.add(class6) 
    db.session.add(class7) 
    db.session.add(class8)
    db.session.add(class9) 
    db.session.add(class10) 
    db.session.add(class11) 
    db.session.add(class12) 
    db.session.add(class13) 
    db.session.add(class14) 
    db.session.add(class15) 
    db.session.add(class16)
    db.session.add(class17) 
    db.session.add(class18) 
    db.session.add(class19)
    db.session.add(class20) 
    db.session.add(class21) 
    
    db.session.commit()
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_classes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.class RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM class")
        
    db.session.commit()