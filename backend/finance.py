from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Transaction
from datetime import datetime

finance_bp = Blueprint("finance", __name__)

@finance_bp.route("/add", methods=["POST"])
def add_transaction():
    user_id = 1  # For testing, use user_id = 1
    data = request.get_json() or {}

    # parse date if provided (expecting YYYY-MM-DD)
    date_str = data.get("date")
    txn_date = None
    if date_str:
        try:
            txn_date = datetime.fromisoformat(date_str).date()
        except Exception:
            txn_date = None

    txn = Transaction(
        user_id=user_id,
        amount=float(data.get("amount", 0)),
        type=data.get("type", "expenses"),
        category=data.get("category", "General"),
        date=txn_date,
        month=data.get("month")
    )
    db.session.add(txn)
    db.session.commit()
    return jsonify({"msg": "Transaction added", "transaction": txn.to_dict()}), 201

@finance_bp.route("/history", methods=["GET"])
def get_history():
    user_id = 1  # For testing, use user_id = 1
    txns = Transaction.query.filter_by(user_id=user_id).order_by(Transaction.date.desc().nullslast()).all()
    return jsonify({"transactions": [t.to_dict() for t in txns]}), 200

@finance_bp.route("/<int:tx_id>", methods=["DELETE"])
def delete_transaction(tx_id):
    user_id = 1  # For testing, use user_id = 1
    tx = Transaction.query.filter_by(id=tx_id, user_id=user_id).first()
    if not tx:
        return jsonify({"msg": "Transaction not found"}), 404
    db.session.delete(tx)
    db.session.commit()
    return jsonify({"msg": "Deleted"}), 200

@finance_bp.route("/<int:tx_id>", methods=["PUT"])
def update_transaction(tx_id):
    user_id = 1  # For testing, use user_id = 1
    tx = Transaction.query.filter_by(id=tx_id, user_id=user_id).first()
    if not tx:
        return jsonify({"msg": "Transaction not found"}), 404

    data = request.get_json() or {}
    if "amount" in data:
        tx.amount = float(data["amount"])
    if "type" in data:
        tx.type = data["type"]
    if "category" in data:
        tx.category = data["category"]
    if "month" in data:
        tx.month = data["month"]
    if "date" in data:
        try:
            tx.date = datetime.fromisoformat(data["date"]).date()
        except Exception:
            pass

    db.session.commit()
    return jsonify({"msg": "Updated", "transaction": tx.to_dict()}), 200
