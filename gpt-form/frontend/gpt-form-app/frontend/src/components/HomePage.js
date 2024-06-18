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
                <Link className="btn btn-primary mx-2" to="/login" role="button">
                  Login
                </Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">
                  Sign-up
                </Link>
              </>
            ) : (
              <Link className="btn btn-primary mx-2" to="/home" role="button">
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
