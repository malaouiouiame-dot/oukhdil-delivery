"""
Backend Oukhdil Delivery
-------------------------
Lance ce serveur avec : python app.py
Il tourne par défaut sur http://localhost:5000
"""

from datetime import timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

from models import db, Rider, Order

app = Flask(__name__)

# --- Configuration ---
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///oukhdil.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "change-cette-cle-en-production"  # À changer avant mise en ligne réelle
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

db.init_app(app)
jwt = JWTManager(app)

# Autorise le site Next.js (localhost:3000) à appeler cette API
CORS(app, resources={r"/api/*": {"origins": "*"}})


# ---------------------------------------------------------------------------
# AUTHENTIFICATION LIVREUR
# ---------------------------------------------------------------------------

@app.route("/api/auth/register", methods=["POST"])
def register():
    """Crée un compte livreur. À utiliser une seule fois par livreur (ou via un admin)."""
    data = request.get_json(force=True)
    name = data.get("name", "").strip()
    phone = data.get("phone", "").strip()
    password = data.get("password", "")

    if not name or not phone or not password:
        return jsonify({"error": "Nom, téléphone et mot de passe sont requis."}), 400

    if Rider.query.filter_by(phone=phone).first():
        return jsonify({"error": "Un livreur avec ce numéro existe déjà."}), 409

    rider = Rider(name=name, phone=phone)
    rider.set_password(password)
    db.session.add(rider)
    db.session.commit()

    return jsonify({"message": "Compte créé avec succès.", "rider": rider.to_dict()}), 201


@app.route("/api/auth/login", methods=["POST"])
def login():
    """Connecte un livreur et renvoie un token à garder côté client (localStorage)."""
    data = request.get_json(force=True)
    phone = data.get("phone", "").strip()
    password = data.get("password", "")

    rider = Rider.query.filter_by(phone=phone).first()
    if not rider or not rider.check_password(password):
        return jsonify({"error": "Numéro ou mot de passe incorrect."}), 401

    token = create_access_token(identity=str(rider.id))
    return jsonify({"token": token, "rider": rider.to_dict()}), 200


@app.route("/api/auth/me", methods=["GET"])
@jwt_required()
def me():
    """Renvoie les infos du livreur actuellement connecté (utile pour vérifier le token)."""
    rider_id = get_jwt_identity()
    rider = Rider.query.get(rider_id)
    if not rider:
        return jsonify({"error": "Livreur introuvable."}), 404
    return jsonify(rider.to_dict()), 200


# ---------------------------------------------------------------------------
# COMMANDES
# ---------------------------------------------------------------------------

@app.route("/api/orders", methods=["POST"])
def create_order():
    """Route PUBLIQUE : un client crée une commande depuis le formulaire du site."""
    data = request.get_json(force=True)
    service = data.get("service", "").strip()
    address = data.get("address", "").strip()
    client_phone = data.get("client_phone", "").strip() or None
    amount = data.get("amount", 20)

    if not service or not address:
        return jsonify({"error": "Le service et l'adresse sont requis."}), 400

    order = Order(service=service, address=address, client_phone=client_phone, amount=amount)
    db.session.add(order)
    db.session.commit()

    return jsonify({"message": "Commande créée.", "order": order.to_dict()}), 201


@app.route("/api/orders", methods=["GET"])
@jwt_required()
def list_orders():
    """Route PROTÉGÉE : un livreur connecté voit toutes les commandes en attente/en cours."""
    status_filter = request.args.get("status")
    query = Order.query
    if status_filter:
        query = query.filter_by(status=status_filter)
    orders = query.order_by(Order.created_at.desc()).all()
    return jsonify([o.to_dict() for o in orders]), 200


@app.route("/api/orders/<int:order_id>", methods=["PATCH"])
@jwt_required()
def update_order(order_id):
    """Route PROTÉGÉE : un livreur met à jour le statut d'une commande (et se l'assigne)."""
    rider_id = get_jwt_identity()
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Commande introuvable."}), 404

    data = request.get_json(force=True)
    new_status = data.get("status")

    if new_status and new_status not in Order.STATUSES:
        return jsonify({"error": f"Statut invalide. Valeurs possibles : {Order.STATUSES}"}), 400

    if new_status:
        order.status = new_status
        if new_status == "en_cours" and not order.rider_id:
            order.rider_id = rider_id

    db.session.commit()
    return jsonify({"message": "Commande mise à jour.", "order": order.to_dict()}), 200


# ---------------------------------------------------------------------------

@app.route("/api/health", methods=["GET"])
def health():
    """Simple route pour vérifier que le serveur tourne."""
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Crée le fichier oukhdil.db et les tables au premier lancement
    app.run(debug=True, port=5000)
