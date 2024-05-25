import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import InputModal from './components/InputModal';
import createPdf from './utils/pdfManipulation';

function App() {
  const [fieldNames, setFieldNames] = useState([]); // State for field names
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({}); // State for user input

  // Function to fetch field names from the PDF (replace with actual implementation)
  const fetchFieldNames = async () => {
    // Replace with your logic to load the PDF and extract field names
    // This could involve reading from a file or fetching from an API
    const exampleFieldNames = ['first-name', 'last-name', 'middle-name'];
    setFieldNames(exampleFieldNames);
  };

  // Function to handle user input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to handle modal submission (calls PDF creation)
  const handleSubmit = async () => {
    try {
      const inputPdf = 'path/to/your/input.pdf'; // Replace with actual path
      const outputPdf = 'annotated_form.pdf'; // Replace with desired name

      await createPdf(inputPdf, outputPdf, formData);
      console.log('PDF created successfully!');

      // Trigger download functionality (example using FileSaver.js)
      const pdfBlob = await fetch(outputPdf).then((response) => response.blob());
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = outputPdf;
      downloadLink.click();
    } catch (error) {
      console.error('Error creating PDF:', error);
    } finally {
      setIsOpen(false); // Close modal after submission
    }
  };

  // Fetch field names on component mount
  useEffect(() => {
    fetchFieldNames();
  }, []);

  return (
    <div className="App">
      <button onClick={() => setIsOpen(true)}>Open Input Form</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      >
        <h2>Enter Form Data</h2>
        {fieldNames.map((fieldName) => (
          <div key={fieldName}>
            <label htmlFor={fieldName}>{fieldName}</label>
            <input
              type="text"
              id={fieldName}
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
}

export default App;
