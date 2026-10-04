import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const vehicleData = {
  Tata: ["Nexon EV", "Punch EV", "Tiago EV", "Curvv EV"],
  Mahindra: ["XUV400 EV", "BE 6", "XEV 9e"],
  MG: ["Windsor EV", "Comet EV", "ZS EV"],
  Hyundai: ["Creta Electric", "Ioniq 5"],
};

function AddEV() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    manufacturer: "",
    model: "",
    registrationNumber: "",
    purchaseYear: "",
    nickname: "",
  });

  const availableModels = useMemo(() => {
    if (!formData.manufacturer) return [];
    return vehicleData[formData.manufacturer] || [];
  }, [formData.manufacturer]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "manufacturer") {
      setFormData((previousData) => ({
        ...previousData,
        manufacturer: value,
        model: "",
      }));
      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Temporary storage until FastAPI is connected.
    localStorage.setItem("userEV", JSON.stringify(formData));

    navigate("/dashboard");
  };

  return (
    <div className="ev-setup-page">
      <header className="setup-header">
        <div className="setup-brand">
          <div className="brand-icon">⚡</div>
          <span>EV Battery Intelligence</span>
        </div>

        <div className="setup-progress">
          <span className="progress-complete">✓</span>
          <span className="progress-line active"></span>
          <span className="progress-current">2</span>
          <span className="progress-line"></span>
          <span className="progress-future">3</span>
        </div>
      </header>

      <main className="setup-container">
        <section className="setup-intro">
          <p className="eyebrow">STEP 2 OF 3</p>

          <h1>Add your EV.</h1>

          <p>
            Select your electric vehicle and add a few ownership details.
            Vehicle specifications will be retrieved from our EV database.
          </p>

          <div className="setup-info-card">
            <div className="info-icon">⚡</div>

            <div>
              <strong>Why select your EV?</strong>
              <p>
                Your dashboard will use this vehicle as your primary EV and
                display its stored specifications.
              </p>
            </div>
          </div>
        </section>

        <section className="ev-form-card">
          <div className="card-heading">
            <p>YOUR VEHICLE</p>
            <h2>EV Details</h2>
            <span>Select your EV and enter your ownership information.</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="manufacturer">Manufacturer</label>

                <select
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select manufacturer</option>
                  {Object.keys(vehicleData).map((manufacturer) => (
                    <option key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="model">Model</label>

                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  disabled={!formData.manufacturer}
                  required
                >
                  <option value="">Select model</option>

                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="registrationNumber">
                Registration number
              </label>

              <input
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                placeholder="e.g. MH 01 AB 1234"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="purchaseYear">Purchase year</label>

                <input
                  id="purchaseYear"
                  name="purchaseYear"
                  type="number"
                  min="2010"
                  max="2030"
                  placeholder="2025"
                  value={formData.purchaseYear}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nickname">
                  EV nickname <span className="optional">(optional)</span>
                </label>

                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  placeholder="My Nexon"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="setup-actions">
              <button
                type="button"
                className="back-button"
                onClick={() => navigate("/")}
              >
                ← Back
              </button>

              <button type="submit" className="continue-button setup-continue">
                Go to Dashboard
                <span>→</span>
              </button>
            </div>
          </form>

          <p className="database-note">
            Vehicle ownership will be linked to your user profile in the
            database.
          </p>
        </section>
      </main>
    </div>
  );
}

export default AddEV;