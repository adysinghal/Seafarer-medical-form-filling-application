import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigateToHome();
    }
  });

  return (
    <>
      <div className="home-page">
        <div className="overlay">
          <h1>Fill Your Medical Forms Faster</h1>
          <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-2" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">
              Sign-up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default HomePage;
