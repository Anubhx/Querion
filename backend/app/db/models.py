from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from .database import Base
from datetime import datetime

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    city = Column(String, index=True)

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    amount = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
