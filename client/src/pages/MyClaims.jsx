import { useEffect, useState } from "react";
import { getMyClaims } from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyClaims() {
  const { token } = useAuth();

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await getMyClaims(token);
        setClaims(data.claims || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [token]);

  if (loading) {
    return <h2>Loading your claims...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="my-claims-page">

      <div className="page-header">
        <p className="section-tag">
          MY ACTIVITY
        </p>

        <h1>My Claims</h1>

        <p>
          Track the items you've submitted claims for.
        </p>
      </div>

      {claims.length === 0 ? (
        <div className="empty-state">
          <h2>No claims yet</h2>

          <p>
            You haven't submitted any claims yet.
          </p>
        </div>
      ) : (
        <div className="claims-list">

          <p className="claims-count">
            {claims.length}{" "}
            {claims.length === 1 ? "claim" : "claims"}
          </p>

          {claims.map((claim) => (
            <div
              className="claim-card"
              key={claim._id}
            >

              {/* Header */}
              <div className="claim-card-header">

                <div>
                  <p className="item-type">
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


              {/* Item Information */}
              <div className="claim-info">

                <div>
                  <span>Category</span>
                  <strong>
                    {claim.item?.category}
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {claim.item?.location}
                  </strong>
                </div>

                <div>
                  <span>Item Status</span>
                  <strong>
                    {claim.item?.status}
                  </strong>
                </div>

                <div>
                  <span>Submitted</span>
                  <strong>
                    {new Date(
                      claim.createdAt
                    ).toLocaleDateString()}
                  </strong>
                </div>

              </div>


              {/* Claim Message */}
              <div className="claim-message">

                <p className="detail-label">
                  YOUR MESSAGE
                </p>

                <p>
                  {claim.message}
                </p>

              </div>


              {/* Approved Contact */}
              {claim.status === "approved" &&
                claim.item?.reportedBy && (
                  <div className="contact-section">

                    <p className="detail-label">
                      CONTACT ITEM OWNER
                    </p>

                    <h3>
                      {claim.item.reportedBy.name}
                    </h3>

                    <p>
                      {claim.item.reportedBy.email}
                    </p>

                    {claim.item.reportedBy.phone && (
                      <p className="contact-phone">
                        📞{" "}
                        {claim.item.reportedBy.phone}
                      </p>
                    )}

                    <p className="contact-note">
                      Your claim was approved by the
                      item owner. You can now contact
                      them to arrange the return.
                    </p>

                  </div>
                )}


              {/* Pending */}
              {claim.status === "pending" && (
                <div className="claim-notice">
                  Your claim is waiting for approval
                  from the item owner.
                </div>
              )}


              {/* Rejected */}
              {claim.status === "rejected" && (
                <div className="claim-notice rejected-notice">
                  Your claim was not approved by the
                  item owner.
                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyClaims;