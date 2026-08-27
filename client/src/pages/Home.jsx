import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">

          <p className="hero-tag">
            CAMPUS LOST & FOUND
          </p>

          <h1>
            Lost something?
            <br />
            <span>Let's find it.</span>
          </h1>

          <p className="hero-description">
            A simple platform to report lost items,
            discover found items, and help reunite
            people with their belongings.
          </p>

          <div className="hero-buttons">

            <Link to="/report">
              <button className="primary-btn">
                Report Lost Item →
              </button>
            </Link>

            <Link to="/items">
              <button className="secondary-btn">
                Browse Found Items
              </button>
            </Link>

          </div>

        </div>
      </section>


      {/* How It Works Section */}
      <section className="features-section">

        <div className="section-heading">

          <p className="section-tag">
            HOW IT WORKS
          </p>

          <h2>
            Find it. Report it. Return it.
          </h2>

          <p>
            Everything you need to manage lost and
            found items in one place.
          </p>

        </div>


        <div className="feature-cards">

          {/* Feature 01 */}
          <div className="feature-card">

            <div className="feature-number">
              01
            </div>

            <h3>
              Report an Item
            </h3>

            <p>
              Tell us about something you lost or found.
            </p>

          </div>


          {/* Feature 02 */}
          <div className="feature-card">

            <div className="feature-number">
              02
            </div>

            <h3>
              Find a Match
            </h3>

            <p>
              Search through reported items and
              discover potential matches.
            </p>

          </div>


          {/* Feature 03 */}
          <div className="feature-card">

            <div className="feature-number">
              03
            </div>

            <h3>
              Get It Back
            </h3>

            <p>
              Connect with the person who found or
              lost the item and complete the claim
              process.
            </p>

          </div>

        </div>

      </section>


      {/* About Section */}
      <section className="about-section">

        <div>
          <p className="section-tag">
            ABOUT THE PLATFORM
          </p>

          <h2>
            Built to make lost & found simple.
          </h2>
        </div>

        <div>
          <p>
            Lost & Found gives students and campus
            communities one place to report lost items,
            discover found belongings, and safely
            reconnect with their owners.
          </p>
        </div>

      </section>


      {/* Footer */}
      <footer>
        <p>
          © 2026 Lost & Found. Built for campus communities.
        </p>
      </footer>

    </div>
  );
}

export default Home;