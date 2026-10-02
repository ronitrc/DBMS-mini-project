
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import text, func
from sqlalchemy.orm import Session

from app.database import engine, Base, get_db
from app import models


# Create database tables from the SQLAlchemy models
Base.metadata.create_all(bind=engine)


# Initialize FastAPI
app = FastAPI(
    title="EV Battery Intelligence API",
    description="Indian EV catalogue and battery thermal analytics",
    version="1.0.0",
)


# --------------------------------------------------
# 1. Home endpoint
# --------------------------------------------------
@app.get("/")
def home():
    return {
        "message": "EV Battery Intelligence API is running"
    }


# --------------------------------------------------
# 2. Database health check
# --------------------------------------------------
@app.get("/health/db")
def database_health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))

    return {
        "database": "connected"
    }


# --------------------------------------------------
# 3. Retrieve all vehicles
# --------------------------------------------------
@app.get("/vehicles")
def get_vehicles(db: Session = Depends(get_db)):
    return (
        db.query(models.Vehicle)
        .order_by(models.Vehicle.vehicle_id)
        .all()
    )


# --------------------------------------------------
# 4. Retrieve a vehicle by ID
# --------------------------------------------------
@app.get("/vehicles/{vehicle_id}")
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
):
    vehicle = (
        db.query(models.Vehicle)
        .filter(models.Vehicle.vehicle_id == vehicle_id)
        .first()
    )

    if vehicle is None:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    return vehicle


# --------------------------------------------------
# 5. Record a vehicle selection
# --------------------------------------------------
@app.post("/vehicles/{vehicle_id}/select")
def select_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
):
    # Verify that the vehicle exists
    vehicle = (
        db.query(models.Vehicle)
        .filter(models.Vehicle.vehicle_id == vehicle_id)
        .first()
    )

    if vehicle is None:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    # Create a selection record
    selection = models.VehicleSelection(
        vehicle_id=vehicle_id
    )

    try:
        db.add(selection)
        db.commit()
        db.refresh(selection)

        return {
            "message": "Vehicle selection recorded successfully",
            "selection_id": selection.selection_id,
            "vehicle_id": selection.vehicle_id,
            "manufacturer": vehicle.manufacturer,
            "model": vehicle.model,
            "selected_at": selection.selected_at,
        }

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to record vehicle selection",
        )


# --------------------------------------------------
# 6. Retrieve all vehicle selection records
# --------------------------------------------------
@app.get("/selections")
def get_selections(db: Session = Depends(get_db)):
    return (
        db.query(models.VehicleSelection)
        .order_by(models.VehicleSelection.selection_id.desc())
        .all()
    )


# --------------------------------------------------
# 7. Get selection statistics for each vehicle
# --------------------------------------------------
@app.get("/analytics/selections")
def get_selection_stats(db: Session = Depends(get_db)):
    results = (
        db.query(
            models.Vehicle.vehicle_id,
            models.Vehicle.manufacturer,
            models.Vehicle.model,
            func.count(
                models.VehicleSelection.selection_id
            ).label("selection_count"),
        )
        .outerjoin(
            models.VehicleSelection,
            models.Vehicle.vehicle_id
            == models.VehicleSelection.vehicle_id,
        )
        .group_by(
            models.Vehicle.vehicle_id,
            models.Vehicle.manufacturer,
            models.Vehicle.model,
        )
        .order_by(models.Vehicle.vehicle_id)
        .all()
    )

    return [
        {
            "vehicle_id": row.vehicle_id,
            "manufacturer": row.manufacturer,
            "model": row.model,
            "selection_count": row.selection_count,
        }
        for row in results
    ]