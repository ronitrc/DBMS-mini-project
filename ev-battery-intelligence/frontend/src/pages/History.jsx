import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Car,
  Clock3,
  History as HistoryIcon,
  Trash2,
  ExternalLink,
  Zap,
} from "lucide-react";

function History() {
  const navigate = useNavigate();

  const selections =
    JSON.parse(localStorage.getItem("vehicleSelections")) || [];

  const clearHistory = () => {
    localStorage.removeItem("vehicleSelections");
    window.location.reload();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="history-page">
      <header className="history-topbar">
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

      <main className="history-container">
        <section className="history-heading">
          <div>
            <p className="dashboard-overline">ACTIVITY</p>
            <h1>Selection history.</h1>
            <p>
              Vehicles you have selected from the EV database.
            </p>
          </div>

          {selections.length > 0 && (
            <button
              className="clear-history-button"
              onClick={clearHistory}
            >
              <Trash2 size={15} />
              Clear history
            </button>
          )}
        </section>

        <section className="history-stat">
          <div className="history-stat-icon">
            <HistoryIcon size={21} />
          </div>

          <div>
            <span>Total selections</span>
            <strong>{selections.length}</strong>
          </div>
        </section>

        {selections.length > 0 ? (
          <section className="history-list">
            <div className="history-list-header">
              <span>Vehicle</span>
              <span>Vehicle ID</span>
              <span>Selected at</span>
              <span>Action</span>
            </div>

            {[...selections].reverse().map((selection) => (
              <article
                className="history-row"
                key={selection.selectionId}
              >
                <div className="history-vehicle">
                  <div className="history-car-icon">
                    <Car size={19} />
                  </div>

                  <div>
                    <strong>{selection.model}</strong>
                    <span>{selection.manufacturer}</span>
                  </div>
                </div>

                <div className="history-id">
                  #{selection.vehicleId}
                </div>

                <div className="history-time">
                  <Clock3 size={14} />
                  {formatDate(selection.selectedAt)}
                </div>

                <button
                  className="history-view-button"
                  onClick={() =>
                    navigate(`/vehicles/${selection.vehicleId}`)
                  }
                >
                  View
                  <ExternalLink size={14} />
                </button>
              </article>
            ))}
          </section>
        ) : (
          <section className="empty-history">
            <div className="empty-history-icon">
              <HistoryIcon size={34} />
            </div>

            <h2>No selections yet</h2>

            <p>
              Select an EV from the catalogue and it will appear
              here.
            </p>

            <button onClick={() => navigate("/vehicles")}>
              Explore EVs
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default History;