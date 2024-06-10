import React from "react";
import "./App.css";
import PdfFormFilling from "./components/PdfFormFilling";
import "./components/PdfFormFilling.css";
import NavBar from "./components/NavBar.js";

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <PdfFormFilling />
      </div>
    </>
  );
}

export default App;
