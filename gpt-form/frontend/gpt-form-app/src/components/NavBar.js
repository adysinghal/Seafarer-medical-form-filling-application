import React from "react";
import logo from '../healthchek.png'

function NavBar() {
  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid mx-3">
        <span class="navbar-brand h1">Form Filling Application</span>
        <img
              src={logo}
              alt="Adi"
              width="10%"       
              class="d-inline-block mx-3"
            />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
