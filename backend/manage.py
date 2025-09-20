from app import create_app
from flask_migrate import Migrate, upgrade
from models import db

app = create_app()

# Initialize Flask-Migrate
migrate = Migrate(app, db)

def setup_database():
    """Initialize database tables on startup"""
    with app.app_context():
        try:
            # Create all tables
            db.create_all()
            print("✅ Database tables created successfully!")
        except Exception as e:
            print(f"⚠️ Database setup warning: {e}")

if __name__ == "__main__":
    # Setup database on startup
    setup_database()

    app.run(debug=True, host="0.0.0.0", port=5000)
