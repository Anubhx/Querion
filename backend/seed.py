import os
import sys
from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine
from app.db.models import Base, Customer, Order
from datetime import datetime, timedelta

def seed_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    try:
        # Check if already seeded
        if db.query(Customer).first():
            print("Database already seeded. Skipping.")
            return

        print("Seeding database...")
        
        customers = [
            Customer(id=1, name="Acme Corp", city="New York"),
            Customer(id=2, name="GlobalTech", city="San Francisco"),
            Customer(id=3, name="LocalShop", city="Chicago"),
        ]
        db.add_all(customers)
        db.commit()
        
        orders = [
            Order(id=1, customer_id=1, amount=150.0, created_at=datetime.utcnow() - timedelta(days=5)),
            Order(id=2, customer_id=1, amount=300.0, created_at=datetime.utcnow() - timedelta(days=2)),
            Order(id=3, customer_id=2, amount=1250.0, created_at=datetime.utcnow() - timedelta(days=1)),
            Order(id=4, customer_id=3, amount=45.0, created_at=datetime.utcnow() - timedelta(days=10)),
            Order(id=5, customer_id=3, amount=85.0, created_at=datetime.utcnow() - timedelta(days=3)),
        ]
        db.add_all(orders)
        db.commit()
        
        print("Done!")
        
    except Exception as e:
        print(f"Error seeding DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
