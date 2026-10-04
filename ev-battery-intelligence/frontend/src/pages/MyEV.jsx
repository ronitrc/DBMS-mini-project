import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BatteryCharging,
  Calendar,
  Car,
  Clock3,
  Gauge,
  Hash,
  MapPin,
  Zap,
} from "lucide-react";

const vehicleSpecs = {
  "Tata-Nexon EV": {
    battery: "40.5 kWh",
    range: "465 km",
    charging: "6.5 hr",
    type: "SUV",
    drive: "FWD",
  },
  "Tata-Punch EV": {
    battery: "35 kWh",
    range: "421 km",
    charging: "5 hr",
    type: "SUV",
    drive: "FWD",
  },
  "Tata-Tiago EV": {
    battery: "24 kWh",
    range: "315 km",
    charging: "3.6 hr",
    type: "Hatchback",
    drive: "FWD",
  },
  "Mahindra-XUV400 EV": {
    battery: "39.4 kWh",
    range: "456 km",
    charging: "6.5 hr",
    type: "SUV",
    drive: "FWD",
  },
  "Mahindra-BE 6": {
    battery: "59 kWh",
    range: "557 km",
    charging: "8 hr",
    type: "SUV",
    drive: "RWD",
  },
  "MG-Windsor EV": {
    battery: "38 kWh",
    range: "331 km",
    charging: "6.5 hr",
    type: "CUV",
    drive: "FWD",
  },
  "MG-Comet EV": {
    battery: "17.3 kWh",
    range: "230 km",
    charging: "7 hr",
    type: "Hatchback",
    drive: "RWD",
  },
  "Hyundai-Creta Electric": {
    battery: "51.4 kWh",
    range: "473 km",
    charging: "7 hr",
    type: "SUV",
    drive: "FWD",
  },
};

function MyEV() {
  const navigate = useNavigate();

  const userEV =
    JSON.parse(localStorage.getItem("userEV")) || null;

  if (!userEV) {
    return (
      <div className="placeholder-page">
        <Car size={45} />
        <h1>No EV added</h1>
        <p>Add your EV to view it here.</p>

        <button
          className="continue-button"
          onClick={() => navigate("/setup-ev")}
        >
          Add an EV
        </button>
      </div>
    );
  }

  const key = `${userEV.manufacturer}-${userEV.model}`;

  const specs = vehicleSpecs[key] || {
    battery: "—",
    range: "—",
    charging: "—",
    type: "Electric Vehicle",
    drive: "—",
  };

  return (
    <div className="my-ev-page">
      <header className="simple-topbar">
        <button
          className="vehicles-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <div className="vehicles-brand">
          <Zap size={18} />
          EV Intelligence
        </div>
      </header>

      <main className="my-ev-container">
        <section className="my-ev-heading">
          <p className="dashboard-overline">YOUR VEHICLE</p>
          <h1>My EV.</h1>

          <p>
            Your registered electric vehicle and ownership
            information.
          </p>
        </section>

        <section className="my-ev-hero">
          <div className="my-ev-identity">
            <span>{userEV.manufacturer}</span>

            <h2>{userEV.model}</h2>

            {userEV.nickname && (
              <p className="ev-nickname">
                “{userEV.nickname}”
              </p>
            )}

            <div className="my-ev-tags">
              <span>{specs.type}</span>
              <span>{specs.drive}</span>
              <span>Electric</span>
            </div>
          </div>

          <div className="my-ev-car">
            <Car size={100} strokeWidth={1} />
          </div>
        </section>

        <section className="my-ev-stats">
          <div>
            <BatteryCharging size={21} />

            <span>
              Battery
              <strong>{specs.battery}</strong>
            </span>
          </div>

          <div>
            <MapPin size={21} />

            <span>
              Range
              <strong>{specs.range}</strong>
            </span>
          </div>

          <div>
            <Clock3 size={21} />

            <span>
              Charging
              <strong>{specs.charging}</strong>
            </span>
          </div>
        </section>

        <section className="ownership-card">
          <div className="record-heading">
            <p className="dashboard-overline">
              OWNERSHIP RECORD
            </p>

            <h2>Vehicle information</h2>

            <p>
              Information associated with your EV profile.
            </p>
          </div>

          <div className="ownership-grid">
            <div>
              <Hash size={18} />

              <span>
                Registration number
                <strong>
                  {userEV.registrationNumber || "—"}
                </strong>
              </span>
            </div>

            <div>
              <Calendar size={18} />

              <span>
                Purchase year
                <strong>
                  {userEV.purchaseYear || "—"}
                </strong>
              </span>
            </div>

            <div>
              <Car size={18} />

              <span>
                Manufacturer
                <strong>{userEV.manufacturer}</strong>
              </span>
            </div>

            <div>
              <Gauge size={18} />

              <span>
                Model
                <strong>{userEV.model}</strong>
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyEV;