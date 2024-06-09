import React from "react";
import logo from '../healthchek.png'

function NavBar() {
  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid mx-3">
          <a class="navbar-brand" href="#">
            <img
              src={logo}
              alt="Adi"
              width="15%"              
              class="d-inline-block mx-3"
            />
            Form Filling Application
          </a>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
