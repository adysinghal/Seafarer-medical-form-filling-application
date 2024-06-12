import React from "react";
import "./App.css";
import PdfFormFilling from "./components/PdfFormFilling";
import "./components/PdfFormFilling.css";
import NavBar from "./components/NavBar.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage.js";
import DownloadedSuccessfully from "./components/DownloadedSuccessfully.js";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route
            path="/home"
            element={
              <div className="App">
                <PdfFormFilling />
              </div>
            }
          />
          <Route path="/filled" element={<DownloadedSuccessfully/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
