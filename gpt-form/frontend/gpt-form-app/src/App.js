import React from 'react';
import './App.css';
import PdfFormFilling from './components/PdfFormFilling';
import './components/PdfFormFilling.css';

function App() {
  return (
    <div className="App">

      <h2>Medical Form Filling Application</h2> 
      {/* add a NavBar for image and heading */}
      {/* <img src='\public\healthchek.png' alt='HealthChek logo'/> */}
      <main>
        <PdfFormFilling />
      </main>
    </div>
  );
}

export default App;
