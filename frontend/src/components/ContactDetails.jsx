const ContactDetails = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <div className="modal-overlay">
      <div className="contact-details-modal">
        <div className="details-header">
          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="details-profile">
          {contact.image ? (
            <img
              src={contact.image}
              alt={contact.name}
              className="details-image"
            />
          ) : (
            <div className="details-avatar">
              {contact.name.charAt(0).toUpperCase()}
            </div>
          )}

          <h2>{contact.name}</h2>

          {contact.jobTitle && (
            <p>{contact.jobTitle}</p>
          )}

          <span className="details-category">
            {contact.category}
          </span>
        </div>

        <div className="details-info">
          <div className="detail-item">
            <span>Email</span>
            <strong>{contact.email}</strong>
          </div>

          <div className="detail-item">
            <span>Phone</span>
            <strong>{contact.phone}</strong>
          </div>

          <div className="detail-item">
            <span>Company</span>
            <strong>{contact.company || "Not provided"}</strong>
          </div>
        </div>

        {contact.notes && (
          <div className="details-notes">
            <span>Notes</span>
            <p>{contact.notes}</p>
          </div>
        )}

        <button
          className="details-close-button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;