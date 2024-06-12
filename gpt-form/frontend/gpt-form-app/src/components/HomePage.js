import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const navigateFunction = () => {
    navigate('/home');
  }

  return (
    <>
      <div className="home-page">
        <div className="overlay">
          <h1>Fill Your Medical Forms Faster</h1>
          <button className="fill-forms-button" onClick={navigateFunction}>
            Fill forms
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
