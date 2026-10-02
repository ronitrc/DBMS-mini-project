
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.database import engine, Base, get_db
from app import models
from app.models import Vehicle


# Create database tables from SQLAlchemy models
Base.metadata.create_all(bind=engine)


# Initialize FastAPI application
app = FastAPI(
    title="EV Battery Intelligence API",
    description="Indian EV catalogue and battery thermal analytics",
    version="1.0.0",
)


# Request schema for creating a vehicle
class VehicleCreate(BaseModel):
    manufacturer: str
    model: str
    vehicle_type: Optional[str] = None
    drive_type: Optional[str] = None
    battery_kwh: Optional[float] = None
    range_km: Optional[float] = None
    charging_time_hr: Optional[float] = None
    release_year: Optional[int] = None
    country: Optional[str] = None
    price_usd: Optional[float] = None


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "EV Battery Intelligence API is running"
    }


# Database health check
@app.get("/health/db")
def database_health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"database": "connected"}


# Create a new vehicle
@app.post("/vehicles", status_code=201)
def create_vehicle(
    vehicle_data: VehicleCreate,
    db: Session = Depends(get_db),
):
    vehicle = Vehicle(**vehicle_data.model_dump())

    try:
        db.add(vehicle)
        db.commit()
        db.refresh(vehicle)
        return vehicle
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Could not create vehicle. Check the server logs.",
        )


# Retrieve all vehicles
@app.get("/vehicles")
def get_vehicles(db: Session = Depends(get_db)):
    return db.query(Vehicle).order_by(Vehicle.vehicle_id).all()


# Retrieve a vehicle by ID
@app.get("/vehicles/{vehicle_id}")
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
):
    vehicle = db.query(Vehicle).filter(
        Vehicle.vehicle_id == vehicle_id
    ).first()

    if vehicle is None:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    return vehicle