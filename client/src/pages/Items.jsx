import { useEffect, useState } from "react";
import { getAllItems } from "../services/api";
import { Link } from "react-router-dom";

function Items() {
  const [items, setItems] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    category: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllItems(filters);

      setItems(data.items || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchItems();
  };

  return (
    <main className="page-container items-page">

      {/* Header */}
      <section className="items-header">
        <p className="section-tag">LOST & FOUND</p>

        <h1>Browse Items</h1>

        <p>
          Find lost and found items reported by users.
        </p>
      </section>

      {/* Search / Filters */}
      <form
        className="filter-form"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="search"
          placeholder="Search items..."
          value={filters.search}
          onChange={handleChange}
        />

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
        >
          <option value="">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Bags">Bags</option>
          <option value="Accessories">Accessories</option>
          <option value="Documents">Documents</option>
          <option value="Clothing">Clothing</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location..."
          value={filters.location}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="primary-btn"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <section className="items-results">

        {loading && (
          <div className="loading">
            Loading items...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="empty-state">
            <h2>No items found</h2>
            <p>
              Try changing your search or filters.
            </p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <p className="results-count">
              {items.length}{" "}
              {items.length === 1 ? "item" : "items"} found
            </p>

            <div className="items-grid">
              {items.map((item) => (
                <article
                  className="item-card"
                  key={item._id}
                >
                  <div className="item-card-top">

                    <span
                      className={`item-type ${item.type}`}
                    >
                      {item.type}
                    </span>

                    <span
                      className={`item-status ${item.status}`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <h2>{item.title}</h2>

                  <p className="item-category">
                    {item.category}
                  </p>

                  <p className="item-description">
                    {item.description}
                  </p>

                  <div className="item-location">
                    📍 {item.location}
                  </div>

                  <div className="item-card-footer">

                    <span>
                      {new Date(
                        item.date
                      ).toLocaleDateString()}
                    </span>

                    <Link
                      to={`/items/${item._id}`}
                    >
                      View Details →
                    </Link>

                  </div>
                </article>
              ))}
            </div>
          </>
        )}

      </section>

    </main>
  );
}

export default Items;