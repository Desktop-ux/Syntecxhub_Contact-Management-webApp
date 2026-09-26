import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return showRegister ? (
      <Register
        onRegister={() => setShowRegister(false)}
        onSwitch={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLogin={() => setIsAuthenticated(true)}
        onSwitch={() => setShowRegister(true)}
      />
    );
  }

  return <Dashboard onLogout={handleLogout} />;
}

export default App;