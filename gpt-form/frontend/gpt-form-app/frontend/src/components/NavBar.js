import React from 'react';
import logo from '../healthchek.png';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.js';
import './NavBar.css';
import { useAlert } from '../contexts/AlertContext.js';

function NavBar(props) {
  let navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const {alert, showAlert} = useAlert();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      showAlert('Logged out successfully', 'success');
    } catch (error) {
      showAlert('Failed to log out', 'danger');
    }
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={logo} alt="Logo" className="logo" />
            <span className="navbar-text">Shipping Medical Forms</span>
          </a>
          {currentUser && (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
