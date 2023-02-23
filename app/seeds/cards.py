from app.models import db, Card, environment, SCHEMA

def seed_cards():
        # Anatomy deck section
        # class: Anatomy; deck: Abdomen Anatomy", deck_id = 1
        card1 = Card(deck_id = 1, card_question = "What are the Main Layers of the Anterolateral Abdominal Wall?", 
                                    card_answer = "Skin, Fascia, Muscle, parietal peritoneum")
        card2 = Card(deck_id = 1, card_question = "BELOW THE UMBILICUS- What are the 2 LAYERS OF SUPERFICIAL FASCIA in the ABDOMINAL WALL?", 
                                    card_answer = "CAMPERS FASCIA, SCARPERS FASCIA")
        card3 = Card(deck_id = 1, card_question = "What are the differences between the Campers and Scarpers Fascia?", 
                                    card_answer = "1) CAMPERS FASCIA- Fatty and Superficial; 2) SCARPERS FASCIA- Membraneous and Deeper")
        
        # class: Anatomy; deck: "Anatomy - Thorax and Abdomen", deck_id = 2
        card4 = Card(deck_id = 2, card_question = "Pyramidalis?", 
                     card_answer = "Small triangular muscle that lies in the rectus sheath anterior to the inferior part of the rectus abdominis - absent in 20% of people")
        card5 = Card(deck_id = 2, card_question = "Linea abla?", card_answer = "Extends from the xiphoid process to the pubic symphysis")
        card6 = Card(deck_id = 2, card_question = "Rectus sheath", card_answer = "Encloses the rectus abdominis muscles and is formed by the interlaced aponeuroses of the flat abdominal muscles")
        
        # class: Anatomy; deck: "Anatomy - abdominal aorta", deck_id = 3
        card7 = Card(deck_id = 3, card_question = "Level of coeliac trunk?", card_answer = "T12")
        card8 = Card(deck_id = 3, card_question = "Branches around coeliac(in order)", card_answer = "Inferior phrenic and middle suprarenal")
        card9 = Card(deck_id = 3, card_question = "Branch of inferior phrenic?", card_answer = "Superior suprarenal")
        
        # Appendicular Skeleton section
        # class: Appendicular Skeleton; deck: "Appendicular Skeleton", deck_id = 4
        card10 = Card(deck_id = 4, card_question = "Head?", card_answer = "Cephalic region")
        card11 = Card(deck_id = 4, card_question = "Central part of the body, the head and trunk?", card_answer = "Axial")
        card12 = Card(deck_id = 4, card_question = "Portion of skull surrounding the brain?", card_answer = "Cranial")
        
        # class: Appendicular Skeleton; deck: "CVA", deck_id = 5
        card13 = Card(deck_id = 5, card_question = "A-/An-?", card_answer = "absence or lack (arrhythmia - lack of normal heartbeat)")
        card14 = Card(deck_id = 5, card_question = "Ab-?", card_answer = "away (abductor muscle - pulls an extremity away from midline)")
        card15 = Card(deck_id = 5, card_question = "Acou-", card_answer = "hearing (acoustics)")
        
        # class: Appendicular Skeleton; deck: "Anatomy (Pharm 110)", deck_id = 6    
        card16 = Card(deck_id = 6, card_question = "anatomy vs physiology?", 
                      card_answer = "anatomy: structure of the body parts and their relationships to one another, Physiology = function of the bodys natural machinery")
        card17 = Card(deck_id = 6, card_question = "what are the levels of structural organization?", card_answer = "Chemical level; Cellular level; Tissue level; Organ level; Organ system; organism")
        card18 = Card(deck_id = 6, card_question = "How many bones compose the appendicular skeleton?", card_answer = "126")
        
        # Axial Skeleton section
        # class: Appendicular Skeleton; deck: "Axial Skeleton", deck_id = 7
        card19 = Card(deck_id = 7, card_question = "Define Axial Skeleton", card_answer = "Aka vertebral column/spine Made up of individual ‘vertebrae’ that are stacked on top of each other")
        card20 = Card(deck_id = 7, card_question = "Define vertebral unit", card_answer = "Two adjacent vertebrae and intervertebral disc between")
        card21 = Card(deck_id = 7, card_question = "State the spinal curves", card_answer = "Cervical curve; Thoracic curve; Lumbar curve; Sacral curve")
        
        # class: Appendicular Skeleton; deck: "Axial Skeleton: Cranial Skull", deck_id = 8
        card22 = Card(deck_id = 8, card_question = "Somewhat cube like bone with lengths and widths equal Examples",
            card_answer = "Short bones: Bones of wrists and ankles")
        card23 = Card(deck_id = 8, card_question = "Bone with Long longitudinal axes and expanded ends Examples", 
                      card_answer = "Long bone Femur phalanges radius ulna")
        card24 = Card(deck_id = 8, card_question = "Plate like bones with broad surfaces Examples", card_answer = "Flat bone Ribs scapula sternum")
        
        # class: Appendicular Skeleton; deck: "Anatomical Directions", deck_id = 9
        card25 = Card(deck_id = 9, card_question = "Superior/Inferior", card_answer = "")
        card26 = Card(deck_id = 9, card_question = "Cranial/Caudal", card_answer = "Head/Tail")
        card27 = Card(deck_id = 9, card_question = "Cephalic", card_answer = "Head")         
        card28 = Card(deck_id = 9, card_question = "Anterior/Posterior", card_answer = "Front/Back")
        card29 = Card(deck_id = 9, card_question = "Ventral/Dorsal", card_answer = "Front/Back")
        card30 = Card(deck_id = 9, card_question = "Lateral/Medial", card_answer = "Left/Right of Center/Center")
        card31 = Card(deck_id = 9, card_question = "Distal/Proximal", card_answer = "Far from attachment point/Close to attachment point")
        card32 = Card(deck_id = 9, card_question = "Deep/Superficial", card_answer = "Plunging into/On Surface")
        
        db.session.add(card1)
        db.session.add(card2)
        db.session.add(card3)
        db.session.add(card4)
        db.session.add(card5)
        db.session.add(card6)
        db.session.add(card7)
        db.session.add(card8)
        db.session.add(card9)
        
        db.session.add(card10)
        db.session.add(card11)
        db.session.add(card12)
        db.session.add(card13)
        db.session.add(card14)
        db.session.add(card15)
        db.session.add(card16)
        db.session.add(card17)
        db.session.add(card18)
        
        db.session.add(card19)
        db.session.add(card20)
        db.session.add(card21)
        db.session.add(card22)
        db.session.add(card23)
        db.session.add(card24)
        db.session.add(card25)
        db.session.add(card26)
        db.session.add(card27)
        db.session.add(card28)
        db.session.add(card29)
        db.session.add(card30)
        db.session.add(card31)
        db.session.add(card32)
        
        db.session.commit()
    
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.card RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM card")
        
    db.session.commit()
    

