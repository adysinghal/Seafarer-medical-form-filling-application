// src/components/PdfFormFilling.js

import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import ValidatedInput from './ValidatedInput';

const PdfFormFilling = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({});
    const [fieldNames, setFieldNames] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const pdfViewerRef = useRef();

    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
        setSelectedFile(files[0]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const loadPdfFields = async (pdfBytes) => {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        return fields.map((field) => field.getName());
    };

    const handleFileUpload = async () => {
        if (files.length > 0) {
            let fieldNamesIntersection = new Set();

            for (const file of files) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const pdfBytes = event.target.result;
                    const currentFileFields = new Set(await loadPdfFields(pdfBytes));

                    if (fieldNamesIntersection.size > 0) {
                        fieldNamesIntersection = new Set(
                            [...fieldNamesIntersection].filter((field) => currentFileFields.has(field))
                        );
                    } else {
                        fieldNamesIntersection = new Set([...currentFileFields]);
                        setFieldNames(Array.from(fieldNamesIntersection));
                    }
                };
                reader.readAsArrayBuffer(file);
            }
        }
    };

    const handleSubmit = async () => {
        let index = 0;
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const pdfBytes = event.target.result;
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const form = pdfDoc.getForm();

                for (const [fieldName, value] of Object.entries(formData)) {
                    try {
                        const field = form.getTextField(fieldName);
                        if (field) {
                            field.setText(value);
                        }
                    } catch (error) {
                        console.error(`Error updating field "${fieldName}":`, error);
                    }
                }

                const modifiedPdfBytes = await pdfDoc.save();
                const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `annotated-form-${index + 1}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleFieldFocus = (fieldName) => {
        // Implement field highlighting logic here
    };

    return (
        <div className="pdf-form-filling-container">
            <div className="form-container">
                <h2>PDF Form Filling</h2>
                <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Load PDF Fields</button>
                {fieldNames.length > 0 && (
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {fieldNames.map((fieldName) => (
                            <ValidatedInput
                                key={fieldName}
                                fieldName={fieldName}
                                value={formData[fieldName] || ''}
                                onChange={handleInputChange}
                            />
                        ))}
                        <button type="submit" style={{ maxWidth: 300 }}>Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PdfFormFilling;
