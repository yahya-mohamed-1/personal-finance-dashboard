from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    # Use production config if deployed, otherwise use development config
    if os.getenv('FLASK_ENV') == 'production':
        app.config.from_object('config_prod.ProductionConfig')
        # Allow all origins in production (configure properly for security)
        CORS(app, origins="*", supports_credentials=True)
    else:
        from config import Config
        app.config.from_object(Config)
        # Allow any localhost origin (any port) during development using a regex.
        # This keeps supports_credentials=True while not restricting to specific dev ports.
        CORS(app, origins=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$", supports_credentials=True)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # register blueprints (defined in other files)
    from auth import auth_bp
    from finance import finance_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(finance_bp, url_prefix="/api/finance")

    # Add a root route to avoid 404 on base URL
    @app.route("/")
    def root():
        return jsonify({"message": "Personal Finance Backend API is running."})

    return app

# for simple local run (manage.py will import this)
app = create_app()
