// src/components/PdfFormFilling.js

import React, { useState, useEffect } from 'react';
import FieldForm from './FieldForm';
import { processPdfFiles, submitPdfFiles } from './PdfProcessor';
import './PdfFormFilling.css';

const PdfFormFilling = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldNames, setFieldNames] = useState([]);
    const [availableFiles, setAvailableFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

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
        await processPdfFiles(files, formData, setFieldNames);
        setIsProcessing(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        submitPdfFiles(files, formData);
    };

    return (
        <div className="pdf-form-filling-container">
            <div className="form-container">
                <h2>PDF Form Filling</h2>
                {!isProcessing && fieldNames.length === 0 && (
                    <div>
                        <label>Select PDF Files:</label>
                        <div>
                            {availableFiles.map((file, index) => (
                                <div key={index}>
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
                        <button onClick={handleNextClick}>Next</button>
                    </div>
                )}
                {isProcessing && <div>Processing...</div>}
                {!isProcessing && fieldNames.length > 0 && (
                    <FieldForm
                        fieldNames={fieldNames}
                        formData={formData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default PdfFormFilling;
