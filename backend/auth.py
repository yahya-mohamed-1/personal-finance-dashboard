from flask import Blueprint, request, jsonify, current_app, url_for
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from models import User
from flask_mail import Mail, Message
from datetime import datetime, timedelta
import secrets

auth_bp = Blueprint("auth", __name__)

mail = Mail()

def init_mail(app):
    mail.init_app(app)

@auth_bp.before_app_request
def init_mail():
    mail.init_app(current_app)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    name = data.get("name") or ""

    if not username or not email or not password:
        return jsonify({"msg": "username, email and password are required"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"msg": "username or email already exists"}), 400

    user = User(username=username, email=email, name=name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"msg": "username and password required"}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": {"id": user.id, "username": user.username, "name": user.name}}), 200

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify({"id": user.id, "username": user.username, "name": user.name, "email": user.email})

@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json() or {}
    email = data.get("email")
    frontend_url = data.get("frontend_url")
    # Prefer explicit frontend_url from request body, else use the request Origin header (sent by browsers),
    # else fall back to configured FRONTEND_URL. Using Origin lets the frontend run on any localhost port.
    request_origin = request.headers.get("Origin")

    if not email:
        return jsonify({"msg": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Email not found"}), 404

    # Check if SMTP is configured
    print(f"MAIL_USERNAME: {current_app.config.get('MAIL_USERNAME')}")
    print(f"MAIL_PASSWORD: {current_app.config.get('MAIL_PASSWORD')}")
    if not current_app.config.get('MAIL_USERNAME') or not current_app.config.get('MAIL_PASSWORD'):
        return jsonify({"msg": "SMTP credentials not configured"}), 500

    # Generate reset token and expiration
    token = secrets.token_urlsafe(32)
    user.reset_token = token
    user.reset_token_expiration = datetime.utcnow() + timedelta(hours=1)
    db.session.commit()

    # Use frontend_url from request body if provided, else use request Origin header, else configured FRONTEND_URL
    frontend_origin = frontend_url or request_origin or current_app.config.get("FRONTEND_URL", "http://localhost:5174")

    # Basic safety: only allow localhost origins in development (prevent open redirect abuse in prod)
    if frontend_origin.startswith("http://localhost") or frontend_origin.startswith("http://127.0.0.1") or frontend_origin.startswith("https://"):
        pass
    else:
        # If frontend_origin looks suspicious, fall back to configured FRONTEND_URL
        frontend_origin = current_app.config.get("FRONTEND_URL", "http://localhost:5174")
    frontend_reset_url = frontend_origin + f"/reset-password?token={token}"

    # Send email
    msg = Message("Password Reset Request",
                  sender=current_app.config.get('MAIL_DEFAULT_SENDER'),
                  recipients=[user.email],
                  body=f"To reset your password, click the following link:\n\n{frontend_reset_url}\n\nIf you did not request this, please ignore this email.")
    mail.send(msg)

    return jsonify({"msg": "Password reset link sent!"}), 200

@auth_bp.route("/reset-password/<token>", methods=["POST"])
def reset_password_token(token):
    data = request.get_json() or {}
    new_password = data.get("password")

    if not new_password:
        return jsonify({"msg": "New password is required"}), 400

    user = User.query.filter_by(reset_token=token).first()
    if not user or not user.reset_token_expiration or user.reset_token_expiration < datetime.utcnow():
        return jsonify({"msg": "Invalid or expired token"}), 400

    user.set_password(new_password)
    user.reset_token = None
    user.reset_token_expiration = None
    db.session.commit()

    return jsonify({"msg": "Password has been reset successfully"}), 200

@auth_bp.route("/delete-account", methods=["DELETE", "OPTIONS"])
@jwt_required(optional=True)  # allow OPTIONS without token
def delete_account():
    if request.method == "OPTIONS":
        return "", 200

    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"msg": "Missing or invalid token"}), 401

    user = User.query.get(int(user_id))
    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json() or {}
    password = data.get("password")
    if not password:
        return jsonify({"msg": "Password is required"}), 400

    if not user.check_password(password):
        return jsonify({"msg": "Invalid password"}), 401

    try:
        from models import Transaction
        Transaction.query.filter_by(user_id=int(user_id)).delete()

        db.session.delete(user)
        db.session.commit()

        return jsonify({"msg": "Account deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Failed to delete account"}), 500

