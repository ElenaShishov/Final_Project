import "./LogoutButton.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton(): JSX.Element {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_code");


    // Redirect to the login page
    navigate("/login");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
