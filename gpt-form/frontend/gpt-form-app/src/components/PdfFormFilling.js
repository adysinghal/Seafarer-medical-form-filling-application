import React, { useState, useEffect } from "react";
import FieldForm from "./FieldForm";
import { processPdfFiles, submitPdfFiles } from "./PdfProcessor";
import "./PdfFormFilling.css";
import { useNavigate } from "react-router";

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

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/");
    }
    // Fetch the available PDF files from the public folder
    const fetchFiles = async () => {
      const response = await fetch("/files.json"); // A JSON file listing the available PDFs
      const fileNames = await response.json();
      setAvailableFiles(fileNames);
    };
    fetchFiles();
  });

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
    if(files.length === 0){
      props.showAlert("Please select at least one form", "danger");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    submitPdfFiles(files, formData);
    navigate("/filled");
    props.showAlert("Downloading", "success")
  };

  const refreshPage = () => {
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: "10px",
        }}
      >
        {files.length === 0 && <p>&nbsp;</p>}
        {files.length > 0 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={refreshPage}
          >
            {"<"} Back
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
                You have selected{" "}
                <span className="underlined">{files.join(", ")}</span>
              </p>
            </>
          )}
          {!isProcessing && fields.commonFields.length === 0 && (
            <div>
              <h3>Select (Tick) Forms to fill:</h3>
              <div className="file-list">
                {availableFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <input
                      type="checkbox"
                      id={`file-${index}`}
                      value={file}
                      onChange={handleFileSelection}
                    />
                    <label htmlFor={`file-${index}`}>{file}</label>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-primary my-3"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          )}
          {isProcessing && <div>Processing...</div>}
          {!isProcessing && fields.commonFields.length > 0 && (
            <>
              <hr></hr>
              <h3>Common Fields</h3>
              <FieldForm
                fieldNames={fields.commonFields}
                formData={formData}
                onInputChange={handleInputChange}
              />
              {files.map((file) => (
                <div key={file}>
                  {fields.individualFields[file].length > 0 && (
                    <>
                      <hr></hr>
                      <h3>&nbsp;{file}</h3>
                    </>
                  )}
                  <FieldForm
                    fieldNames={fields.individualFields[file]}
                    formData={formData}
                    onInputChange={handleInputChange}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PdfFormFilling;
