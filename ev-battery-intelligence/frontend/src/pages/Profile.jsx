import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  User,
  Car,
  Zap,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("evUser")) || {
      fullName: "EV User",
      email: "Not available",
      phone: "Not available",
      city: "India",
    };

  const userEV =
    JSON.parse(localStorage.getItem("userEV")) || null;

  const initial =
    user.fullName?.charAt(0).toUpperCase() || "E";

  return (
    <div className="profile-page">
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

      <main className="profile-container">
        <section className="profile-heading">
          <p className="dashboard-overline">ACCOUNT</p>
          <h1>Your profile.</h1>

          <p>
            Personal information associated with your EV account.
          </p>
        </section>

        <section className="profile-layout">
          <aside className="profile-summary-card">
            <div className="large-avatar">
              {initial}
            </div>

            <h2>{user.fullName}</h2>

            <p>
              <MapPin size={13} />
              {user.city || "India"}
            </p>

            <div className="profile-ev-status">
              <Car size={18} />

              <div>
                <span>Registered EV</span>

                <strong>
                  {userEV
                    ? `${userEV.manufacturer} ${userEV.model}`
                    : "No EV registered"}
                </strong>
              </div>
            </div>
          </aside>

          <section className="profile-details-card">
            <div className="record-heading">
              <p className="dashboard-overline">
                USER RECORD
              </p>

              <h2>Personal information</h2>

              <p>
                Details entered when your profile was created.
              </p>
            </div>

            <div className="profile-fields">
              <div className="profile-field">
                <User size={18} />

                <div>
                  <span>Full name</span>
                  <strong>{user.fullName}</strong>
                </div>
              </div>

              <div className="profile-field">
                <Mail size={18} />

                <div>
                  <span>Email address</span>
                  <strong>{user.email}</strong>
                </div>
              </div>

              <div className="profile-field">
                <Phone size={18} />

                <div>
                  <span>Phone number</span>
                  <strong>{user.phone}</strong>
                </div>
              </div>

              <div className="profile-field">
                <MapPin size={18} />

                <div>
                  <span>City</span>
                  <strong>{user.city}</strong>
                </div>
              </div>
            </div>

            <div className="profile-db-note">
              <div className="status-dot"></div>

              <div>
                <strong>Frontend demo record</strong>

                <span>
                  This information will later be retrieved
                  from PostgreSQL through FastAPI.
                </span>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Profile;