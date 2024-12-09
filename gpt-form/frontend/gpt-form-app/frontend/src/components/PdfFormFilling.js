import React, { useState, useEffect } from 'react';
import FieldForm from './FieldForm';
import { processPdfFiles, submitPdfFiles } from './PdfProcessor';
import './PdfFormFilling.css';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { useAlert } from '../contexts/AlertContext';

const PdfFormFilling = (props) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState({
    commonFields: [],
    individualFields: {},
  });
  const [availableFiles, setAvailableFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [show, setShow] = useState(false);
  const { alert, showAlert } = useAlert();

  // Define the desired order of fields
  const desiredOrder = [
    'First name', 'Last name', 'Middle name', 'Address', 'Mobile',
    'DOB-Day', 'DOB-Month', 'DOB-Year', 'Sex', 'Date of filling',
    'Time of filling', 'Passport-number', 'Birth-city', 'Birth-country',
    'Weight', 'Height', 'BMI', 'BP', 'Pulse'
  ];

  // Helper function to reorder fields
  const reorderFields = (fieldsArray) => {
    const knownFieldsInForm = desiredOrder.filter((field) => fieldsArray.includes(field));
    const unknownFields = fieldsArray.filter((field) => !desiredOrder.includes(field));
    // If you only want the known fields, omit the unknownFields:
    return [...knownFieldsInForm, ...unknownFields];
  };

  useEffect(() => {
    // Fetch the available PDF files from the public folder
    const fetchFiles = async () => {
      const response = await fetch('/files.json'); // A JSON file listing the available PDFs
      const fileNames = await response.json();
      setAvailableFiles(fileNames);
    };
    fetchFiles();
  }, []);

  const handleFileSelection = (event) => {
    const selectedFile = event.target.value;
    setFiles((prevFiles) => {
      if (prevFiles.includes(selectedFile)) {
        return prevFiles.filter((file) => file !== selectedFile);
      } else {
        return [...prevFiles, selectedFile];
      }
    });
  };

  const handleNextClick = async () => {
    setIsProcessing(true);
    await processPdfFiles(files, formData, setFields);
    setIsProcessing(false);
    if (files.length === 0) {
      showAlert('Please select at least one form', 'danger');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    submitPdfFiles(files, formData);
    navigate('/filled');
    showAlert('Downloading', 'success');
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirmBack = () => {
    if (window.confirm('If you go back, you might lose the entered information. Do you still want to go back?')) {
      refreshPage();
    }
  };

  const refreshPage = () => {
    navigate('/');
  };

  const reorderedCommonFields = reorderFields(fields.commonFields);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '10px',
        }}
      >
        {files.length === 0 && <p>&nbsp;</p>}
        {files.length > 0 && (
          <button type="button" className="btn btn-primary" onClick={handleConfirmBack}>
            {'<'} Back
          </button>
        )}
      </div>
      <div className="pdf-form-filling-container">
        <div className="form-container">
          <h2>Shipping Medical Forms</h2>
          {files.length === 0 && <p>&nbsp;</p>}

          {files.length > 0 && (
            <>
              <p>
                You have selected <span className="underlined">{files.join(', ')}</span>
              </p>
            </>
          )}
          {!isProcessing && fields.commonFields.length === 0 && (
            <div>
              <h3>Select (Tick) Forms to fill:</h3>
              <div className="file-list">
                {availableFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <input type="checkbox" id={`file-${index}`} value={file} onChange={handleFileSelection} />
                    <label htmlFor={`file-${index}`}>{file}</label>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary my-3" onClick={handleNextClick}>
                Next
              </button>
            </div>
          )}
          {isProcessing && <div>Processing...</div>}
          {!isProcessing && fields.commonFields.length > 0 && (
            <>
              <hr></hr>
              <h3>Common Fields</h3>
              <FieldForm fieldNames={reorderedCommonFields} formData={formData} onInputChange={handleInputChange} />
              {files.map((file) => {
                const reorderedIndividualFields = reorderFields(fields.individualFields[file] || []);
                return (
                  <div key={file}>
                    {reorderedIndividualFields.length > 0 && (
                      <>
                        <hr></hr>
                        <h3>&nbsp;{file}</h3>
                      </>
                    )}
                    <FieldForm
                      fieldNames={reorderedIndividualFields}
                      formData={formData}
                      onInputChange={handleInputChange}
                    />
                  </div>
                );
              })}
              <button type="button" onClick={handleShow} className="btn btn-primary">
                Download
              </button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Download</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to download all the forms?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Download
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PdfFormFilling;
