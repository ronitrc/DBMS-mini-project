import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BatteryCharging,
  Car,
  Clock3,
  Gauge,
  MapPin,
  Calendar,
  IndianRupee,
  CheckCircle2,
  Zap,
} from "lucide-react";

const vehicles = [
  {
    id: 1,
    manufacturer: "Tata",
    model: "Nexon EV",
    type: "SUV",
    driveType: "FWD",
    battery: 40.5,
    range: 465,
    charging: 6.5,
    year: 2025,
    country: "India",
    price: "₹14.49 Lakh",
  },
  {
    id: 2,
    manufacturer: "Tata",
    model: "Punch EV",
    type: "SUV",
    driveType: "FWD",
    battery: 35,
    range: 421,
    charging: 5,
    year: 2025,
    country: "India",
    price: "₹10.99 Lakh",
  },
  {
    id: 3,
    manufacturer: "Tata",
    model: "Tiago EV",
    type: "Hatchback",
    driveType: "FWD",
    battery: 24,
    range: 315,
    charging: 3.6,
    year: 2024,
    country: "India",
    price: "₹7.99 Lakh",
  },
  {
    id: 4,
    manufacturer: "Mahindra",
    model: "XUV400 EV",
    type: "SUV",
    driveType: "FWD",
    battery: 39.4,
    range: 456,
    charging: 6.5,
    year: 2024,
    country: "India",
    price: "₹15.49 Lakh",
  },
  {
    id: 5,
    manufacturer: "Mahindra",
    model: "BE 6",
    type: "SUV",
    driveType: "RWD",
    battery: 59,
    range: 557,
    charging: 8,
    year: 2025,
    country: "India",
    price: "₹18.90 Lakh",
  },
  {
    id: 6,
    manufacturer: "MG",
    model: "Windsor EV",
    type: "CUV",
    driveType: "FWD",
    battery: 38,
    range: 331,
    charging: 6.5,
    year: 2025,
    country: "India",
    price: "₹13.99 Lakh",
  },
  {
    id: 7,
    manufacturer: "MG",
    model: "Comet EV",
    type: "Hatchback",
    driveType: "RWD",
    battery: 17.3,
    range: 230,
    charging: 7,
    year: 2024,
    country: "India",
    price: "₹6.99 Lakh",
  },
  {
    id: 8,
    manufacturer: "Hyundai",
    model: "Creta Electric",
    type: "SUV",
    driveType: "FWD",
    battery: 51.4,
    range: 473,
    charging: 7,
    year: 2025,
    country: "India",
    price: "₹17.99 Lakh",
  },
];

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = vehicles.find(
    (item) => item.id === Number(id)
  );

  if (!vehicle) {
    return (
      <div className="placeholder-page">
        <h1>Vehicle not found</h1>

        <button
          className="back-button"
          onClick={() => navigate("/vehicles")}
        >
          Return to catalogue
        </button>
      </div>
    );
  }

  const handleSelection = () => {
    const existingSelections =
      JSON.parse(localStorage.getItem("vehicleSelections")) || [];

    const selection = {
      selectionId: Date.now(),
      vehicleId: vehicle.id,
      manufacturer: vehicle.manufacturer,
      model: vehicle.model,
      selectedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "vehicleSelections",
      JSON.stringify([...existingSelections, selection])
    );

    navigate("/history");
  };

  return (
    <div className="vehicle-details-page">
      <header className="details-topbar">
        <button
          className="vehicles-back"
          onClick={() => navigate("/vehicles")}
        >
          <ArrowLeft size={17} />
          EV Catalogue
        </button>

        <div className="vehicles-brand">
          <Zap size={18} />
          EV Intelligence
        </div>
      </header>

      <main className="details-container">
        <section className="details-hero">
          <div>
            <p className="dashboard-overline">
              VEHICLE RECORD #{vehicle.id}
            </p>

            <span className="details-manufacturer">
              {vehicle.manufacturer}
            </span>

            <h1>{vehicle.model}</h1>

            <div className="details-tags">
              <span>{vehicle.type}</span>
              <span>{vehicle.driveType}</span>
              <span>{vehicle.country}</span>
            </div>
          </div>

          <div className="details-car-visual">
            <Car size={100} strokeWidth={1} />
          </div>
        </section>

        <section className="details-highlight-grid">
          <div className="detail-highlight">
            <BatteryCharging size={22} />

            <div>
              <span>Battery capacity</span>
              <strong>{vehicle.battery} kWh</strong>
            </div>
          </div>

          <div className="detail-highlight">
            <MapPin size={22} />

            <div>
              <span>Driving range</span>
              <strong>{vehicle.range} km</strong>
            </div>
          </div>

          <div className="detail-highlight">
            <Clock3 size={22} />

            <div>
              <span>Charging time</span>
              <strong>{vehicle.charging} hr</strong>
            </div>
          </div>
        </section>

        <section className="vehicle-record-section">
          <div className="record-panel">
            <div className="record-heading">
              <p className="dashboard-overline">
                DATABASE RECORD
              </p>

              <h2>Vehicle specifications</h2>

              <p>
                Complete information stored for this electric
                vehicle.
              </p>
            </div>

            <div className="record-table">
              <div className="record-row">
                <span>Vehicle ID</span>
                <strong>#{vehicle.id}</strong>
              </div>

              <div className="record-row">
                <span>Manufacturer</span>
                <strong>{vehicle.manufacturer}</strong>
              </div>

              <div className="record-row">
                <span>Model</span>
                <strong>{vehicle.model}</strong>
              </div>

              <div className="record-row">
                <span>Vehicle type</span>
                <strong>{vehicle.type}</strong>
              </div>

              <div className="record-row">
                <span>Drive type</span>
                <strong>{vehicle.driveType}</strong>
              </div>

              <div className="record-row">
                <span>Battery capacity</span>
                <strong>{vehicle.battery} kWh</strong>
              </div>

              <div className="record-row">
                <span>Range</span>
                <strong>{vehicle.range} km</strong>
              </div>

              <div className="record-row">
                <span>Charging time</span>
                <strong>{vehicle.charging} hours</strong>
              </div>

              <div className="record-row">
                <span>Release year</span>
                <strong>{vehicle.year}</strong>
              </div>

              <div className="record-row">
                <span>Country</span>
                <strong>{vehicle.country}</strong>
              </div>

              <div className="record-row">
                <span>Price</span>
                <strong>{vehicle.price}</strong>
              </div>
            </div>
          </div>

          <aside className="selection-panel">
            <div className="selection-icon">
              <CheckCircle2 size={25} />
            </div>

            <h2>Select this EV</h2>

            <p>
              Add this vehicle to your selection history for
              quick access later.
            </p>

            <div className="selection-summary">
              <div>
                <Car size={16} />
                <span>
                  Type
                  <strong>{vehicle.type}</strong>
                </span>
              </div>

              <div>
                <Gauge size={16} />
                <span>
                  Drive
                  <strong>{vehicle.driveType}</strong>
                </span>
              </div>

              <div>
                <Calendar size={16} />
                <span>
                  Year
                  <strong>{vehicle.year}</strong>
                </span>
              </div>

              <div>
                <IndianRupee size={16} />
                <span>
                  Price
                  <strong>{vehicle.price}</strong>
                </span>
              </div>
            </div>

            <button
              className="select-vehicle-button"
              onClick={handleSelection}
            >
              <CheckCircle2 size={17} />
              Select this EV
            </button>

            <small>
              Selection will be recorded in your history.
            </small>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default VehicleDetails;