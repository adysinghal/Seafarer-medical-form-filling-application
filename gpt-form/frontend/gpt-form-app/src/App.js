import React, { useState } from "react";
import "./App.css";
import PdfFormFilling from "./components/PdfFormFilling";
import "./components/PdfFormFilling.css";
import NavBar from "./components/NavBar.js";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./components/HomePage.js";
import DownloadedSuccessfully from "./components/DownloadedSuccessfully.js";
import Login from "./components/Login.js";
import Alert from "./components/Alert";
import Signup from "./components/Signup.js";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      <Router>
        <NavBar showAlert={showAlert}/>
        <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route
              path="/home"
              element={
                <div className="App">
                  <PdfFormFilling showAlert={showAlert}/>
                </div>
              }
            />
            <Route path="signup" element={<Signup showAlert={showAlert} />}/>
            <Route path="/filled" element={<DownloadedSuccessfully />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
