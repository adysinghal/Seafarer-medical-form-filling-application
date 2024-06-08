// src/components/PdfFormFilling.js

import React, { useState } from 'react';
import FileInput from './FileInput';
import FieldForm from './FieldForm';
import { processPdfFiles, submitPdfFiles } from './PdfProcessor';
import './PdfFormFilling.css';

const PdfFormFilling = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldNames, setFieldNames] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        processPdfFiles(selectedFiles, formData, setFieldNames);
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
                <FileInput onFileChange={handleFileChange} />
                {fieldNames.length > 0 && (
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
