from app import app, db
from models import User, Transaction
from sqlalchemy import text

with app.app_context():
    with db.engine.connect() as conn:
        result = conn.execute(
            text("SELECT table_name FROM information_schema.tables WHERE table_schema='public';")
        )
        rows = result.fetchall()
        print("Tables in DB:", rows)
