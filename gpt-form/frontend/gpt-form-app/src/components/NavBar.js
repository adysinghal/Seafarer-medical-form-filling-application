import React from "react";
import logo from '../healthchek.png'

function NavBar() {
  return (
    <>
      <nav className="navbar sticky-top bg-body-tertiary">
        <div className="container-fluid mx-3">
        <span className="navbar-brand h1">Shipping Form Filling Application</span>
        <img
              src={logo}
              alt="Logo"
              width="10%"       
              className="d-inline-block mx-3"
            />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
