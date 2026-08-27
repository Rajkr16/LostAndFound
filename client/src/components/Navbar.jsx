import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        Lost<span>&</span>Found
      </Link>


      {/* Desktop Navigation */}
      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/items">
          Browse Items
        </Link>

        {user ? (
          <>
            <Link to="/report">
              Report Item
            </Link>

            <Link to="/my-reports">
              My Reports
            </Link>

            <Link to="/my-claims">
              My Claims
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <button
              className="login-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="login-btn"
            >
              Register
            </Link>
          </>
        )}

      </div>


      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>


      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mobile-nav">

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/items"
            onClick={closeMenu}
          >
            Browse Items
          </Link>

          {user ? (
            <>
              <Link
                to="/report"
                onClick={closeMenu}
              >
                Report Item
              </Link>

              <Link
                to="/my-reports"
                onClick={closeMenu}
              >
                My Reports
              </Link>

              <Link
                to="/my-claims"
                onClick={closeMenu}
              >
                My Claims
              </Link>

              <Link
                to="/dashboard"
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <button
                className="mobile-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;