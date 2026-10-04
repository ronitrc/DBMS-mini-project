import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Car,
  MapPin,
  Search,
  SlidersHorizontal,
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
  },
];

function Vehicles() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [manufacturer, setManufacturer] = useState("All");
  const [vehicleType, setVehicleType] = useState("All");

  const manufacturers = [
    "All",
    ...new Set(vehicles.map((vehicle) => vehicle.manufacturer)),
  ];

  const vehicleTypes = [
    "All",
    ...new Set(vehicles.map((vehicle) => vehicle.type)),
  ];

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        vehicle.manufacturer.toLowerCase().includes(searchValue) ||
        vehicle.model.toLowerCase().includes(searchValue);

      const matchesManufacturer =
        manufacturer === "All" ||
        vehicle.manufacturer === manufacturer;

      const matchesType =
        vehicleType === "All" ||
        vehicle.type === vehicleType;

      return matchesSearch && matchesManufacturer && matchesType;
    });
  }, [searchTerm, manufacturer, vehicleType]);

  return (
    <div className="vehicles-page">
      <header className="vehicles-topbar">
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

      <main className="vehicles-container">
        <section className="vehicles-heading">
          <p className="dashboard-overline">EV DATABASE</p>
          <h1>Explore electric vehicles.</h1>

          <p>
            Search and filter vehicles stored in the EV catalogue.
          </p>
        </section>

        <section className="vehicle-toolbar">
          <div className="vehicle-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search manufacturer or model..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="vehicle-filter">
            <SlidersHorizontal size={16} />

            <select
              value={manufacturer}
              onChange={(event) =>
                setManufacturer(event.target.value)
              }
            >
              {manufacturers.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === "All"
                    ? "All manufacturers"
                    : brand}
                </option>
              ))}
            </select>
          </div>

          <div className="vehicle-filter">
            <Car size={16} />

            <select
              value={vehicleType}
              onChange={(event) =>
                setVehicleType(event.target.value)
              }
            >
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All"
                    ? "All vehicle types"
                    : type}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div className="vehicle-results-header">
          <p>
            <strong>{filteredVehicles.length}</strong>{" "}
            vehicles found
          </p>
        </div>

        {filteredVehicles.length > 0 ? (
          <section className="catalogue-grid">
            {filteredVehicles.map((vehicle) => (
              <article
                className="catalogue-card"
                key={vehicle.id}
              >
                <div className="catalogue-card-header">
                  <span>{vehicle.manufacturer}</span>

                  <span className="vehicle-type">
                    {vehicle.type}
                  </span>
                </div>

                <div className="catalogue-car-visual">
                  <Car size={48} strokeWidth={1.4} />
                </div>

                <div className="catalogue-card-title">
                  <h2>{vehicle.model}</h2>
                  <span>{vehicle.year}</span>
                </div>

                <div className="catalogue-specs">
                  <div>
                    <BatteryCharging size={17} />
                    <span>
                      Battery
                      <strong>{vehicle.battery} kWh</strong>
                    </span>
                  </div>

                  <div>
                    <MapPin size={17} />
                    <span>
                      Range
                      <strong>{vehicle.range} km</strong>
                    </span>
                  </div>
                </div>

                <div className="catalogue-meta">
                  <span>Drive</span>
                  <strong>{vehicle.driveType}</strong>

                  <span>Charging</span>
                  <strong>{vehicle.charging} hr</strong>
                </div>

                <button
                  className="catalogue-view-button"
                  onClick={() =>
                    navigate(`/vehicles/${vehicle.id}`)
                  }
                >
                  View vehicle details
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </section>
        ) : (
          <div className="no-vehicles">
            <Car size={36} />
            <h3>No vehicles found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Vehicles;