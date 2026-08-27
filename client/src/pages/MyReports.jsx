import { useEffect, useState } from "react";
import {
  getMyItemClaims,
  updateClaimStatus
} from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyReports() {
  const { token } = useAuth();

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClaims = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyItemClaims(token);

      setClaims(data.claims || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [token]);

  const handleStatusUpdate = async (claimId, status) => {
    try {
      await updateClaimStatus(
        claimId,
        status,
        token
      );

      await fetchClaims();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <main className="page-container">
        <div className="loading">
          Loading your reports...
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

  return (
    <main className="page-container reports-page">

      {/* Header */}
      <section className="reports-header">
        <p className="section-tag">
          MY ACTIVITY
        </p>

        <h1>My Reports</h1>

        <p>
          Review claims submitted on the items
          you've reported.
        </p>
      </section>

      {claims.length === 0 ? (
        <div className="empty-state reports-empty">
          <h2>No claims yet</h2>

          <p>
            No claims have been submitted on your
            items yet.
          </p>
        </div>
      ) : (
        <section className="reports-list">

          <p className="results-count">
            {claims.length}{" "}
            {claims.length === 1
              ? "claim"
              : "claims"} received
          </p>

          {claims.map((claim) => (
            <article
              className="report-claim-card"
              key={claim._id}
            >

              {/* Header */}
              <div className="report-card-header">

                <div>
                  <p className="claim-type">
                    {claim.item?.type}
                  </p>

                  <h2>
                    {claim.item?.title || "Item"}
                  </h2>
                </div>

                <span
                  className={`claim-status ${claim.status}`}
                >
                  {claim.status}
                </span>

              </div>

              {/* Item info */}
              <div className="report-item-info">

                <div>
                  <span>Item Status</span>

                  <strong className="capitalize">
                    {claim.item?.status || "—"}
                  </strong>
                </div>

                <div>
                  <span>Claim Submitted</span>

                  <strong>
                    {claim.createdAt
                      ? new Date(
                          claim.createdAt
                        ).toLocaleDateString()
                      : "—"}
                  </strong>
                </div>

              </div>

              {/* Claimant */}
              <div className="claimant-section">

                <p className="details-label">
                  CLAIMANT
                </p>

                <h3>
                  {claim.claimant?.name || "Unknown user"}
                </h3>

                <p className="claimant-email">
                  {claim.claimant?.email || "No email available"}
                </p>

              </div>

              {/* Message */}
              <div className="incoming-message">

                <p className="details-label">
                  CLAIM MESSAGE
                </p>

                <p>
                  {claim.message}
                </p>

              </div>

              {/* Actions */}
              {claim.status === "pending" && (
                <div className="claim-actions">

                  <div>
                    <strong>
                      Review this claim
                    </strong>

                    <p>
                      Approving will mark the item
                      as returned.
                    </p>
                  </div>

                  <div className="action-buttons">

                    <button
                      className="approve-btn"
                      onClick={() =>
                        handleStatusUpdate(
                          claim._id,
                          "approved"
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleStatusUpdate(
                          claim._id,
                          "rejected"
                        )
                      }
                    >
                      Reject
                    </button>

                  </div>

                </div>
              )}

              {claim.status === "approved" && (
                <div className="decision-message approved-message">
                  ✓ You approved this claim. The item
                  has been marked as returned.
                </div>
              )}

              {claim.status === "rejected" && (
                <div className="decision-message rejected-message">
                  This claim was rejected.
                </div>
              )}

            </article>
          ))}

        </section>
      )}

    </main>
  );
}

export default MyReports;