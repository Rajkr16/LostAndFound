import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllItems,
  getMyClaims,
  getMyItemClaims
} from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, token } = useAuth();

  const [stats, setStats] = useState({
    reports: 0,
    active: 0,
    returned: 0,
    claims: 0,
    received: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const itemsData = await getAllItems();

        const myItems = (itemsData.items || []).filter(
          (item) =>
            item.reportedBy?._id === user.id ||
            item.reportedBy === user.id
        );

        const myClaimsData = await getMyClaims(token);
        const receivedClaimsData =
          await getMyItemClaims(token);

        setStats({
          reports: myItems.length,

          active: myItems.filter(
            (item) => item.status === "active"
          ).length,

          returned: myItems.filter(
            (item) => item.status === "returned"
          ).length,

          claims: myClaimsData.count || 0,

          received: receivedClaimsData.count || 0
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchDashboardData();
    }
  }, [user, token]);

  if (loading) {
    return (
      <main className="page-container">
        <div className="loading">
          Loading dashboard...
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
    <main className="page-container dashboard">

      {/* Header */}
      <section className="dashboard-header">
        <div>
          <p className="section-tag">DASHBOARD</p>

          <h1>
            Welcome back,{" "}
            <span>{user.name}</span> 👋
          </h1>

          <p className="dashboard-subtitle">
            Here's an overview of your Lost & Found
            activity.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-grid">

        <div className="stat-card">
          <p className="stat-label">
            TOTAL REPORTS
          </p>

          <h2>{stats.reports}</h2>

          <p>Items you've reported</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">
            ACTIVE ITEMS
          </p>

          <h2>{stats.active}</h2>

          <p>Still looking for their owners</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">
            RETURNED
          </p>

          <h2>{stats.returned}</h2>

          <p>Successfully returned</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">
            MY CLAIMS
          </p>

          <h2>{stats.claims}</h2>

          <p>Claims you've submitted</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">
            CLAIMS RECEIVED
          </p>

          <h2>{stats.received}</h2>

          <p>Claims on your items</p>
        </div>

      </section>

      {/* Quick Actions */}
      <section className="dashboard-actions">

        <div className="section-heading">
          <p className="section-tag">
            QUICK ACTIONS
          </p>

          <h2>What would you like to do?</h2>
        </div>

        <div className="action-grid">

          <Link
            to="/report"
            className="action-card"
          >
            <span>01</span>

            <h3>Report an Item</h3>

            <p>
              Report something you've lost or found.
            </p>

            <strong>→</strong>
          </Link>

          <Link
            to="/items"
            className="action-card"
          >
            <span>02</span>

            <h3>Browse Items</h3>

            <p>
              Search through reported lost and found
              items.
            </p>

            <strong>→</strong>
          </Link>

          <Link
            to="/my-claims"
            className="action-card"
          >
            <span>03</span>

            <h3>My Claims</h3>

            <p>
              Check the status of your submitted
              claims.
            </p>

            <strong>→</strong>
          </Link>

          <Link
            to="/my-reports"
            className="action-card"
          >
            <span>04</span>

            <h3>My Reports</h3>

            <p>
              Manage your reported items and claims.
            </p>

            <strong>→</strong>
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Dashboard;