from app.models import db, Deck, environment, SCHEMA

def seed_decks():
        # *** Anatomy Decks ***
        # Anatomy
        deck1 = Deck(name = "Abdomen Anatomy", class_id = 1) #Abdomen Anatomy
        deck2 = Deck(name = "Anatomy - Thorax and Abdomen", class_id = 1) #Abdomen Anatomy
        deck3 = Deck(name = "Anatomy - abdominal aorta", class_id = 1 )
        
        # Appendicular Skeleton
        deck4 = Deck(name = "Appendicular Skeleton", class_id = 2) #Abdomen Anatomy
        deck5 = Deck(name = "CVA", class_id = 2) #Abdomen Anatomy
        deck6 = Deck(name = "Anatomy (Pharm 110)", class_id = 2 )    
        
        # Axial Skeleton
        deck7 = Deck(name = "Axial Skeleton", class_id = 3) #Abdomen Anatomy
        deck8 = Deck(name = "Axial Skeleton: Cranial Skull", class_id = 3) #Abdomen Anatomy
        deck9 = Deck(name = "Radiography of the Axial Skeleton", class_id = 3 )        
        # Back Anatomy    
        # Cardiac Anatomy    
        # Craniofacial    
        # Dental Anatomy    
        # Ear Nose Throat    
        # Facial Muscles    
        # Female Pelvis    
        # Female Reproductive System    
        # Gross Anatomy    
        # Head Neck Anatomy    
        # Lower Limb Anatomy
        # Male Reproductive System
        # Microanatomy
        # Muscles Of Facial Expression
        # Neuroanatomy
        # Spinal Anatomy
        # Thorax Anatomy
        # Upper Limb Anatomy

        db.session.add(deck1)
        db.session.add(deck2)
        db.session.add(deck3)
        db.session.add(deck4)
        db.session.add(deck5)
        db.session.add(deck6)
        db.session.add(deck7)
        db.session.add(deck8)
        db.session.add(deck9)
        
        db.session.commit()
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.deck RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM deck")
        
    db.session.commit()