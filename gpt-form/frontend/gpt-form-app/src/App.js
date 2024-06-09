import React from 'react';
import './App.css';
import PdfFormFilling from './components/PdfFormFilling';
import './components/PdfFormFilling.css';
import NavBar from './components/NavBar.js';

function App() {
  return (
    <>
    <NavBar/>
    <div className="App">

      {/* add a NavBar for image and heading */}
      <main>
        <PdfFormFilling />
      </main>
    </div>
    </>
  );
}

export default App;
