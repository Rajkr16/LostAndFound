import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../services/api";
import { useAuth } from "../context/AuthContext";

function ReportItem() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    type: "lost",
    category: "",
    description: "",
    location: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = await createItem(formData, token);

      setMessage(
        data.message || "Item reported successfully!"
      );

      setTimeout(() => {
        navigate("/items");
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="page-container">
        <div className="login-required">
          <p className="section-tag">REPORT AN ITEM</p>

          <h1>Login required</h1>

          <p>
            Please login to report a lost or found item.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container report-page">

      {/* Header */}
      <section className="report-header">
        <p className="section-tag">REPORT AN ITEM</p>

        <h1>Help return what was lost.</h1>

        <p>
          Report a lost item or something you found
          on campus.
        </p>
      </section>

      {/* Form */}
      <div className="report-layout">

        <form
          className="report-form"
          onSubmit={handleSubmit}
        >

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">
              Item Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="Example: Blue Backpack"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Type + Category */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="type">
                Item Type
              </label>

              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="lost">
                  Lost
                </option>

                <option value="found">
                  Found
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Bags">
                  Bags
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="Documents">
                  Documents
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

          </div>

          {/* Location + Date */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                type="text"
                name="location"
                placeholder="Example: College Cafeteria"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">
                Date
              </label>

              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe the item in detail..."
              value={formData.description}
              onChange={handleChange}
              rows="7"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="primary-btn report-submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Report Item →"}
          </button>

          {message && (
            <p
              className={
                message.includes("successfully")
                  ? "success-message"
                  : "form-message"
              }
            >
              {message}
            </p>
          )}

        </form>

        {/* Side information */}
        <aside className="report-info">

          <p className="section-tag">
            HOW IT WORKS
          </p>

          <h2>
            Three simple steps.
          </h2>

          <div className="report-step">
            <span>01</span>

            <div>
              <h3>Report</h3>
              <p>
                Add the details of the lost or found
                item.
              </p>
            </div>
          </div>

          <div className="report-step">
            <span>02</span>

            <div>
              <h3>Connect</h3>
              <p>
                People can discover your report and
                submit a claim.
              </p>
            </div>
          </div>

          <div className="report-step">
            <span>03</span>

            <div>
              <h3>Return</h3>
              <p>
                Review the claim and help return the
                item to its owner.
              </p>
            </div>
          </div>

        </aside>

      </div>

    </main>
  );
}

export default ReportItem;