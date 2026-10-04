import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Search,
  History,
  User,
  BatteryCharging,
  MapPin,
  Clock3,
  ArrowRight,
  Database,
  Zap,
} from "lucide-react";

const demoVehicles = [
  {
    id: 1,
    manufacturer: "Tata",
    model: "Nexon EV",
    type: "SUV",
    battery: "40.5 kWh",
    range: "465 km",
    charging: "6.5 hr",
  },
  {
    id: 2,
    manufacturer: "Mahindra",
    model: "XUV400 EV",
    type: "SUV",
    battery: "39.4 kWh",
    range: "456 km",
    charging: "6.5 hr",
  },
  {
    id: 3,
    manufacturer: "MG",
    model: "Windsor EV",
    type: "CUV",
    battery: "38 kWh",
    range: "331 km",
    charging: "6.5 hr",
  },
];

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("evUser")) || {
    fullName: "EV User",
    city: "India",
  };

  const userEV = JSON.parse(localStorage.getItem("userEV")) || {
    manufacturer: "Tata",
    model: "Nexon EV",
    registrationNumber: "Not added",
    purchaseYear: "—",
    nickname: "",
  };

  const firstName = user.fullName?.split(" ")[0] || "EV User";

  const primaryVehicle =
    demoVehicles.find(
      (vehicle) =>
        vehicle.manufacturer === userEV.manufacturer &&
        vehicle.model === userEV.model
    ) || demoVehicles[0];

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Zap size={19} />
          </div>

          <div>
            <strong>EV Intelligence</strong>
            <span>Management Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/my-ev")}
            >
            <Car size={19} />
            My EV
            </button>

          <button
            className="nav-item"
            onClick={() => navigate("/vehicles")}
            >
            <Search size={19} />
            Explore EVs
            </button>

          <button
            className="nav-item"
            onClick={() => navigate("/history")}
            >
            <History size={19} />
                History
            </button>

          <button
            className="nav-item"
            onClick={() => navigate("/profile")}
            >
            <User size={19} />
                Profile
            </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="database-status">
            <span className="status-dot"></span>

            <div>
              <strong>Database</strong>
              <span>Frontend demo mode</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-overline">OVERVIEW</p>
            <h1>Welcome back, {firstName}.</h1>
            <p>Manage your EV and explore the vehicle database.</p>
          </div>

          <div className="user-profile">
            <div className="profile-avatar">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user.fullName}</strong>
              <span>
                <MapPin size={12} />
                {user.city || "India"}
              </span>
            </div>
          </div>
        </header>

        <section className="primary-ev-section">
          <div className="section-heading">
            <div>
              <p className="dashboard-overline">PRIMARY VEHICLE</p>
              <h2>Your EV</h2>
            </div>

            <button
            className="text-button"
            onClick={() => navigate("/vehicles")}
            >
            View all vehicles
            <ArrowRight size={15} />
            </button>
          </div>

          <div className="primary-ev-card">
            <div className="vehicle-identity">
              <div className="vehicle-icon">
                <Car size={31} />
              </div>

              <div>
                <span>{userEV.manufacturer}</span>
                <h3>{userEV.model}</h3>

                <p>
                  {userEV.nickname
                    ? `${userEV.nickname} · `
                    : ""}
                  {userEV.registrationNumber}
                </p>
              </div>
            </div>

            <div className="vehicle-spec">
              <BatteryCharging size={19} />
              <div>
                <span>Battery</span>
                <strong>{primaryVehicle.battery}</strong>
              </div>
            </div>

            <div className="vehicle-spec">
              <MapPin size={19} />
              <div>
                <span>Range</span>
                <strong>{primaryVehicle.range}</strong>
              </div>
            </div>

            <div className="vehicle-spec">
              <Clock3 size={19} />
              <div>
                <span>Charging</span>
                <strong>{primaryVehicle.charging}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="database-overview">
          <div className="section-heading">
            <div>
              <p className="dashboard-overline">DATABASE OVERVIEW</p>
              <h2>EV Catalogue</h2>
            </div>
          </div>

          <div className="stats-grid">
            <div className="dashboard-stat-card">
              <div className="stat-icon">
                <Car size={20} />
              </div>

              <div>
                <span>Total vehicles</span>
                <strong>12</strong>
                <small>Available in catalogue</small>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-icon">
                <Database size={20} />
              </div>

              <div>
                <span>Manufacturers</span>
                <strong>5</strong>
                <small>EV brands stored</small>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-icon">
                <History size={20} />
              </div>

              <div>
                <span>Your selections</span>
                <strong>3</strong>
                <small>Vehicle records viewed</small>
              </div>
            </div>
          </div>
        </section>

        <section className="explore-section">
          <div className="section-heading">
            <div>
              <p className="dashboard-overline">DISCOVER</p>
              <h2>Explore EVs</h2>
            </div>

            <button className="text-button">
              View all vehicles
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="dashboard-vehicle-grid">
            {demoVehicles.map((vehicle) => (
              <article className="dashboard-vehicle-card" key={vehicle.id}>
                <div className="vehicle-card-top">
                  <span>{vehicle.manufacturer}</span>
                  <span className="vehicle-type">{vehicle.type}</span>
                </div>

                <div className="vehicle-card-icon">
                  <Car size={36} />
                </div>

                <h3>{vehicle.model}</h3>

                <div className="mini-specs">
                  <span>
                    <BatteryCharging size={14} />
                    {vehicle.battery}
                  </span>

                  <span>
                    <MapPin size={14} />
                    {vehicle.range}
                  </span>
                </div>

                <button
                  className="view-vehicle-button"
                  onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                >
                  View details
                  <ArrowRight size={15} />
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;