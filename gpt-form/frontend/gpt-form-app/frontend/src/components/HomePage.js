import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const navigateToHome = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigateToHome();
    }
  });

  return (
    <>
      <div className="home-page">
        <div className="overlay">
          <h1>Fill Your Medical Forms Faster</h1>
          <form className="d-flex" role="search">
            {!currentUser ? (
              <>
                <div className="button-container mt-3">
                  <Link className="fill-forms-button mx-3" to="/login" role="button">
                    Log In
                  </Link>
                  <p className="mt-2">Existing user</p>
                </div>
                <div className="button-container mt-3">
                  <Link className="fill-forms-button mx-3" to="/signup" role="button">
                    Sign Up
                  </Link>
                  <p className="mt-2">New user</p>
                </div>
              </>
            ) : (
              <Link className="fill-forms-button mx-3" to="/home" role="button">
                Fill forms
              </Link>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default HomePage;
