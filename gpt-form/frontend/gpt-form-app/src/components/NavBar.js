import React from "react";
import logo from "../healthchek.png";
import { useNavigate } from "react-router";

function NavBar(props) {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    props.showAlert("Logged out successfully", "success");
  };

  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="/">
          <img
            src={logo}
            alt="Logo"
            width="100vw"
            className="d-inline-block mx-3"
          />
          Shipping Medical Forms
        </a>
        {localStorage.getItem("token") ? (
          <button onClick={handleLogout} className="btn btn-primary mx-4">
            Logout
          </button>
        ) : (<p></p>)}
      </nav>
    </>
  );
}

export default NavBar;
