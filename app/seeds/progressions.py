from app.models import db, Progress, environment, SCHEMA

# Progress score will be initialized to zero and scaled proporationally to number of cards remaining

def seed_progressions():
        # initialize all progress to zero and then increment as a function of position in deck
        
        prog1 = Progress(user_id = 1, deck_id = 1, progress_score = 0)
        prog2 = Progress(user_id = 1, deck_id = 2, progress_score = 0)
        prog3 = Progress(user_id = 1, deck_id = 3, progress_score = 0)
        prog4 = Progress(user_id = 2, deck_id = 4, progress_score = 0)
        prog5 = Progress(user_id = 2, deck_id = 5, progress_score = 0)
        prog6 = Progress(user_id = 2, deck_id = 6, progress_score = 0)
        prog7 = Progress(user_id = 3, deck_id = 7, progress_score = 0)
        prog8 = Progress(user_id = 3, deck_id = 8, progress_score = 0)
        prog9 = Progress(user_id = 3, deck_id = 9, progress_score = 0)
        
        db.session.add(prog1)
        db.session.add(prog2)
        db.session.add(prog3)
        db.session.add(prog4)
        db.session.add(prog5)
        db.session.add(prog6)
        db.session.add(prog7)
        db.session.add(prog8)
        db.session.add(prog9)
        
        db.session.commit()
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_progressions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.progress RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM progress")
        
    db.session.commit()