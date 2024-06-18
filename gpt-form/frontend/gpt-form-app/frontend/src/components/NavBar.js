import React from 'react';
import logo from '../healthchek.png';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.js';

function NavBar(props) {
  let navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      props.showAlert('Logged out successfully', 'success');
    } catch (error) {
      props.showAlert('Failed to log out', 'danger');
    }
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" width="100vw" className="d-inline-block mx-3" />
          Shipping Medical Forms
        </a>
        {currentUser && (
          <button onClick={handleLogout} className="btn btn-primary mx-4">
            Logout
          </button>
        )}
      </nav>
    </>
  );
}

export default NavBar;
