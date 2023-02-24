from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .classes import seed_classes, undo_classes
from .categories_classes import seed_categories_classes, undo_categories_classes
from .decks import seed_decks, undo_decks
from .cards import seed_cards, undo_cards
from .progressions import seed_progressions, undo_progressions

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    seed_categories()
    seed_classes()
    seed_categories_classes()
    seed_decks()
    seed_cards()
    seed_progressions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_classes()
    undo_categories_classes()
    undo_decks()
    undo_cards()
    undo_progressions()
    # Add other undo functions here