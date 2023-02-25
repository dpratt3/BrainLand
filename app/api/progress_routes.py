from flask import Blueprint, jsonify, session, request
from app.models import User, db, Progress
from flask_login import current_user, login_user, logout_user, login_required

progress_routes = Blueprint('progress', __name__)

@progress_routes.route('/<int:id>', methods = ["GET"])
def get_all_progress(id):
    if current_user.is_authenticated:
        
        # Get all progress for user
        progress = Progress.query.filter(Progress.user_id == id).all()
        all_progress_by_user = [prog.to_dict() for prog in progress]
        
        if not progress:
            return {"Error": "No progress available for designated user", "statusCode": 404}, 404
            
    return {"Progress": all_progress_by_user}