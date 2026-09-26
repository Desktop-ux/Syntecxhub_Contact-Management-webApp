import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ContactForm = ({ contact, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    category: "Other",
    notes: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        company: contact.company || "",
        jobTitle: contact.jobTitle || "",
        category: contact.category || "Other",
        notes: contact.notes || "",
        image: contact.image || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (contact) {
        await axios.put(
          `${API_URL}/contacts/${contact._id}`,
          formData,
          config
        );
      } else {
        await axios.post(
          `${API_URL}/contacts`,
          formData,
          config
        );
      }

      onSaved();
      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save contact"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="contact-form-modal">
        <div className="modal-header">
          <div>
            <p className="eyebrow">
              {contact ? "CONTACT MANAGEMENT" : "NEW CONTACT"}
            </p>

            <h2>
              {contact ? "Edit Contact" : "Add New Contact"}
            </h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Google"
              />
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Software Engineer"
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group form-full">
              <label>Profile Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="form-group form-full">
              <label>Notes</label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional information..."
                rows="4"
              />
            </div>
          </div>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : contact
                ? "Update Contact"
                : "Save Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;