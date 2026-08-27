import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById, createClaim } from "../services/api";
import { useAuth } from "../context/AuthContext";

function ItemDetails() {
  const { id } = useParams();

  const { user, token } = useAuth();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [message, setMessage] = useState("");
  const [claimMessage, setClaimMessage] = useState("");
  const [claimLoading, setClaimLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data.item);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleClaim = async (e) => {
    e.preventDefault();

    if (!claimMessage.trim()) {
      setMessage("Please enter a claim message.");
      return;
    }

    try {
      setClaimLoading(true);
      setMessage("");

      const data = await createClaim(
        id,
        claimMessage,
        token
      );

      setMessage(data.message);
      setClaimMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setClaimLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="page-container">
        <div className="loading">
          Loading item...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <div className="error-message">
          {error}
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <h2>Item not found.</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container item-details-page">

      {/* Header */}
      <div className="details-header">
        <div className="details-badges">
          <span className={`item-type ${item.type}`}>
            {item.type}
          </span>

          <span className={`item-status ${item.status}`}>
            {item.status}
          </span>
        </div>

        <p className="section-tag">
          ITEM DETAILS
        </p>

        <h1>{item.title}</h1>

        <p className="details-intro">
          Review the item information below.
        </p>
      </div>

      <div className="details-layout">

        {/* Main information */}
        <section className="details-card">

          <div className="details-info-grid">

            <div>
              <span>Category</span>
              <strong>{item.category}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{item.location}</strong>
            </div>

            <div>
              <span>Date Reported</span>
              <strong>
                {new Date(
                  item.date
                ).toLocaleDateString()}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="capitalize">
                {item.status}
              </strong>
            </div>

          </div>

          <div className="details-description">
            <p className="details-label">
              DESCRIPTION
            </p>

            <p>
              {item.description}
            </p>
          </div>

          {/* Reporter */}
          {item.reportedBy && (
            <div className="reporter-box">

              <p className="details-label">
                REPORTED BY
              </p>

              <h3>
                {item.reportedBy.name}
              </h3>

              <p>
                {item.reportedBy.email}
              </p>

            </div>
          )}

        </section>

        {/* Claim section */}
        <aside className="claim-card">

          {item.status === "active" && user ? (
            <>
              <p className="section-tag">
                CLAIM THIS ITEM
              </p>

              <h2>
                Is this your item?
              </h2>

              <p className="claim-description">
                Tell the reporter why you believe
                this item belongs to you.
              </p>

              <form onSubmit={handleClaim}>

                <textarea
                  placeholder="Explain why you believe this item belongs to you..."
                  value={claimMessage}
                  onChange={(e) =>
                    setClaimMessage(e.target.value)
                  }
                  rows="7"
                />

                <button
                  type="submit"
                  className="primary-btn claim-button"
                  disabled={claimLoading}
                >
                  {claimLoading
                    ? "Submitting..."
                    : "Submit Claim →"}
                </button>

              </form>

              {message && (
                <p
                  className={
                    message.includes("success")
                      ? "success-message"
                      : "form-message"
                  }
                >
                  {message}
                </p>
              )}
            </>
          ) : item.status === "active" && !user ? (
            <>
              <p className="section-tag">
                CLAIM THIS ITEM
              </p>

              <h2>
                Found your item?
              </h2>

              <p className="claim-description">
                Please login to submit a claim
                for this item.
              </p>
            </>
          ) : (
            <>
              <p className="section-tag">
                ITEM STATUS
              </p>

              <h2>
                This item is {item.status}.
              </h2>

              <p className="claim-description">
                Claims are not available for this
                item at the moment.
              </p>
            </>
          )}

        </aside>

      </div>

    </main>
  );
}

export default ItemDetails;