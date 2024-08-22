import React, { useState } from 'react';
import './App.css';
import PdfFormFilling from './components/PdfFormFilling.js';
import './components/PdfFormFilling.css';
import NavBar from './components/NavBar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import DownloadedSuccessfully from './components/DownloadedSuccessfully.js';
import Signup from './components/Signup.js';
import { Container } from 'react-bootstrap';
import AuthProvider from './contexts/AuthContext.js';
import Login from './components/Login.js';
import PrivateRoute from './components/PrivateRoute.js';
import ForgotPassword from './components/ForgotPassword.js';
import AlertProvider from './contexts/AlertContext.js';
import Alert from './components/Alert.js';

function App() {
  return (
    <>
      <AuthProvider>
        <AlertProvider>
          <Router>
            <NavBar />
            <Alert />
            <Routes>
              <Route exact path="/" element={<HomePage />} />

              <Route path="signup" element={<Signup />} />
              <Route path="/login" element={<Login  />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <div className="App">
                      <PdfFormFilling  />
                    </div>
                  </PrivateRoute>
                }
              />
              <Route
                path="/filled"
                element={
                  <PrivateRoute>
                    <DownloadedSuccessfully />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </AlertProvider>
      </AuthProvider>
    </>
  );
}

export default App;
