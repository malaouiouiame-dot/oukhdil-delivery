from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class Rider(db.Model):
    """Un livreur qui peut se connecter au tableau de bord."""
    __tablename__ = "riders"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, raw_password: str) -> None:
        self.password_hash = generate_password_hash(raw_password)

    def check_password(self, raw_password: str) -> bool:
        return check_password_hash(self.password_hash, raw_password)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "phone": self.phone}


class Order(db.Model):
    """Une commande passée par un client depuis le site."""
    __tablename__ = "orders"

    STATUSES = ("en_attente", "en_cours", "livree", "annulee")

    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    client_phone = db.Column(db.String(30), nullable=True)
    amount = db.Column(db.Float, nullable=False, default=20)
    status = db.Column(db.String(20), nullable=False, default="en_attente")
    rider_id = db.Column(db.Integer, db.ForeignKey("riders.id"), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    rider = db.relationship("Rider", backref="orders")

    def to_dict(self):
        return {
            "id": self.id,
            "service": self.service,
            "address": self.address,
            "client_phone": self.client_phone,
            "amount": self.amount,
            "status": self.status,
            "rider_id": self.rider_id,
            "rider_name": self.rider.name if self.rider else None,
            "created_at": self.created_at.isoformat(),
        }
