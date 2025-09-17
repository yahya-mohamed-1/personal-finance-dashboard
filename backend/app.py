from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # register blueprints (defined in other files)
    from auth import auth_bp
    from finance import finance_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(finance_bp, url_prefix="/api/finance")

    return app

# for simple local run (manage.py will import this)
app = create_app()
