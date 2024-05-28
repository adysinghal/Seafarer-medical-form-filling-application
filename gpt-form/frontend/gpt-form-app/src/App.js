import React from 'react';
import './App.css';
import FormSelection from './components/FormSelection';
import FormCreation from './components/FormCreation';
import PdfFormFilling from './components/PdfFormFilling';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Medical Form Filling Application</h1>
      </header>
      <main>
        <FormCreation />
        <FormSelection />
        <PdfFormFilling />
      </main>
    </div>
  );
}

export default App;
