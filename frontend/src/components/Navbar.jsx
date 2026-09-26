const Navbar = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">C</div>
        <span>ContactHub</span>
      </div>

      <div className="nav-right">
        <div className="user-info">
          <div className="user-avatar">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <span>{user.name || "User"}</span>
        </div>

        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;