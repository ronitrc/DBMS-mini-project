
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    vehicle_id = Column(Integer, primary_key=True, index=True)
    manufacturer = Column(String(100), nullable=False)
    model = Column(String(150), nullable=False)
    vehicle_type = Column(String(50))
    drive_type = Column(String(50))
    battery_kwh = Column(Float)
    range_km = Column(Float)
    charging_time_hr = Column(Float)
    release_year = Column(Integer)
    country = Column(String(100))
    price_usd = Column(Float)


class VehicleSelection(Base):
    __tablename__ = "vehicle_selections"

    selection_id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(
        Integer,
        ForeignKey("vehicles.vehicle_id"),
        nullable=False,
    )
    selected_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )