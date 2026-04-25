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

        print("Seeding database with realistic data...")
        import random
        from datetime import date
        
        customers = [
            Customer(id=1, name="Acme Corp", city="New York"),
            Customer(id=2, name="GlobalTech", city="San Francisco"),
            Customer(id=3, name="LocalShop", city="Chicago"),
            Customer(id=4, name="Nova Inc", city="Austin"),
            Customer(id=5, name="Beta LLC", city="Seattle"),
            Customer(id=6, name="Globex", city="Denver"),
        ]
        db.add_all(customers)
        db.commit()
        
        print("Generating orders over the last 12 months...")
        orders = []
        base_date = datetime.now() - timedelta(days=365)
        
        order_id = 1
        for day_offset in range(365):
            # 2 to 6 orders per day
            for _ in range(random.randint(2, 6)):
                cust_id = random.randint(1, 6)
                # varying amounts, higher for some customers
                base_amt = 50.0 if cust_id % 2 == 1 else 200.0
                amount = base_amt * random.uniform(0.5, 2.5)
                
                order_date = base_date + timedelta(days=day_offset, hours=random.randint(6, 20))
                
                orders.append(
                    Order(id=order_id, customer_id=cust_id, amount=round(amount, 2), created_at=order_date)
                )
                order_id += 1
                
        # Batch insert
        db.bulk_save_objects(orders)
        db.commit()
        
        print(f"Done! Inserted {len(customers)} customers and {len(orders)} orders.")
        
    except Exception as e:
        print(f"Error seeding DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
