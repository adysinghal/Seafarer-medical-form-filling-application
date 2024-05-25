// components/Modal.js
import React, { useState } from 'react';
import ReactModal, { Modal as ReactModalModal, Button } from 'react-modal'; // Assuming using react-modal

const InputModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({}); // State to store user input

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData); // Call provided onSubmit function with user data
    onClose(); // Close the modal after submit
  };

  return (
    <ReactModalModal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <h2>Enter Form Data</h2>
      {/* Iterate through field names and create input fields */}
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
      <Button onClick={onClose}>Close</Button>
    </ReactModalModal>
  );
};

const modalStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
};

export default InputModal;
