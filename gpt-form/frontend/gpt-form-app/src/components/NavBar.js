import React from "react";
import logo from '../healthchek.png';

function NavBar() {
  return (
    <>
      <nav className="navbar sticky-top bg-body-tertiary" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="container-fluid mx-3">
          <span className="navbar-brand h1">Shipping Medical Forms</span>
          <img
            src={logo}
            alt="Logo"
            width= "150vw"       
            className="d-inline-block mx-3"
          />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
