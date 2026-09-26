import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import ContactDetails from "../components/ContactDetails";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = ({ onLogout }) => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${API_URL}/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchContacts();
        } catch (error) {
            console.error("Failed to delete contact:", error);
        }
    };

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`${API_URL}/contacts`, {
                params: {
                    search,
                    category,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setContacts(response.data.contacts);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [search, category]);

    const totalContacts = contacts.length;

    const personalCount = contacts.filter(
        (contact) => contact.category === "Personal"
    ).length;

    const workCount = contacts.filter(
        (contact) => contact.category === "Work"
    ).length;

    const otherCount = contacts.filter(
        (contact) =>
            !["Personal", "Work"].includes(contact.category)
    ).length;

    return (
        <div className="dashboard-page">
            <Navbar onLogout={onLogout} />

            <main className="dashboard-content">
                <section className="dashboard-header">
                    <div>
                        <p className="eyebrow">CONTACT MANAGEMENT</p>
                        <h1>Manage Your Contacts</h1>
                        <p className="dashboard-subtitle">
                            Keep your important contacts organized in one place.
                        </p>
                    </div>

                    <button
                        className="add-contact-button"
                        onClick={() => {
                            setEditingContact(null);
                            setShowForm(true);
                        }}
                    >
                        + Add Contact
                    </button>
                </section>

                <section className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">Total Contacts</span>
                        <strong>{totalContacts}</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">Personal</span>
                        <strong>{personalCount}</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">Work</span>
                        <strong>{workCount}</strong>
                    </div>

                    <div className="stat-card">
                        <span className="stat-label">Others</span>
                        <strong>{otherCount}</strong>
                    </div>
                </section>

                <section className="contacts-section">
                    <div className="section-header">
                        <div>
                            <p className="eyebrow">YOUR CONTACTS</p>
                            <h2>Contacts</h2>
                        </div>

                        <span className="contact-count">
                            {contacts.length} contacts
                        </span>
                    </div>

                    <div className="contact-toolbar">
                        <input
                            type="text"
                            placeholder="Search by name, email or company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                            <option value="Family">Family</option>
                            <option value="Friends">Friends</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="empty-state">
                            Loading contacts...
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="empty-state">
                            <h3>No contacts found</h3>
                            <p>
                                Add your first contact to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="contacts-list">
                            {contacts.map((contact) => (
                                <div className="contact-row" key={contact._id}>
                                    <div className="contact-avatar">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="contact-main">
                                        <strong>{contact.name}</strong>
                                        <span>{contact.email}</span>
                                    </div>

                                    <div className="contact-company">
                                        {contact.company || "—"}
                                    </div>

                                    <span className="category-badge">
                                        {contact.category}
                                    </span>

                                    <div className="contact-actions">
                                        <button
                                            onClick={() => setSelectedContact(contact)}
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditingContact(contact);
                                                setShowForm(true);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            {selectedContact && (
                <ContactDetails
                    contact={selectedContact}
                    onClose={() => setSelectedContact(null)}
                />
            )}

            {showForm && (
                <ContactForm
                    contact={editingContact}
                    onClose={() => {
                        setShowForm(false);
                        setEditingContact(null);
                    }}
                    onSaved={fetchContacts}
                />
            )}

        </div>
    );
};

export default Dashboard;