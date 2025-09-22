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

    # ✅ Use production config if deployed, otherwise use development config
    if os.getenv('FLASK_ENV') == 'production':
        app.config.from_object('config_prod.ProductionConfig')

        # ✅ Explicit, secure CORS setup
        CORS(
            app,
            origins=[
                "https://personal-finance-dashboard-livid.vercel.app",
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:3000"
            ],
            supports_credentials=True,
            expose_headers=["Content-Type", "Authorization"],
            allow_headers=["Content-Type", "Authorization"],
            methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        )
    else:
        from config import Config
        app.config.from_object(Config)

        # ✅ Allow localhost (any port) during development
        CORS(
            app,
            origins=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
            supports_credentials=True,
            expose_headers=["Content-Type", "Authorization"],
            allow_headers=["Content-Type", "Authorization"],
            methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        )

    # ✅ Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # ✅ Register blueprints
    from auth import auth_bp
    from finance import finance_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(finance_bp, url_prefix="/api/finance")

    # ✅ Root route
    @app.route("/")
    def root():
        return jsonify({"message": "Personal Finance Backend API is running."})

    return app


# ✅ For Render or local run
app = create_app()
