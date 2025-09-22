from app import create_app
from models import db
import os

app = create_app()

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

    # Check if running in production (with Gunicorn)
    if os.getenv('FLASK_ENV') == 'production':
        # In production, let Gunicorn handle the server
        # This is just for initialization
        print("🚀 Production mode: Ready for Gunicorn")
    else:
        # Development mode: run Flask dev server
        print("🔧 Development mode: Starting Flask dev server")
        app.run(debug=True, host="0.0.0.0", port=5000)
