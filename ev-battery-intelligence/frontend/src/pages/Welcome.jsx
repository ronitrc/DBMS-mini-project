import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Temporary until FastAPI /users endpoint is connected.
    console.log("User details:", formData);

    // Store temporarily so the next pages can use the user's name.
    localStorage.setItem("evUser", JSON.stringify(formData));

    navigate("/setup-ev");
  };

  return (
    <div className="welcome-page">
      <div className="brand">
        <div className="brand-icon">⚡</div>
        <span>EV Battery Intelligence</span>
      </div>

      <main className="welcome-content">
        <section className="welcome-intro">
          <p className="eyebrow">EV MANAGEMENT PLATFORM</p>

          <h1>
            Your EV journey
            <span> starts here.</span>
          </h1>

          <p className="intro-text">
            Explore electric vehicles, compare their specifications,
            and manage your EV profile from one simple dashboard.
          </p>

          <div className="feature-row">
            <div className="mini-feature">
              <strong>Explore</strong>
              <span>EV catalogue</span>
            </div>

            <div className="mini-feature">
              <strong>Compare</strong>
              <span>Vehicle specifications</span>
            </div>

            <div className="mini-feature">
              <strong>Manage</strong>
              <span>Your EV profile</span>
            </div>
          </div>
        </section>

        <section className="user-card">
          <div className="card-heading">
            <p>GET STARTED</p>
            <h2>Create your profile</h2>
            <span>Enter your details to continue to EV setup.</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="continue-button">
              Continue to EV Setup
              <span>→</span>
            </button>
          </form>

          <p className="database-note">
            Your profile will be stored securely in the application database.
          </p>
        </section>
      </main>

      <footer className="welcome-footer">
        EV Battery Intelligence · DBMS Project
      </footer>
    </div>
  );
}

export default Welcome;