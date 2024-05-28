// src/components/PdfFormFilling.js
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PdfFormFilling = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [fieldNames, setFieldNames] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loadPdfFields = async (pdfBytes) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const names = fields.map((field) => field.getName());
    setFieldNames(names);
  };

  const handleFileUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdfBytes = event.target.result;
        await loadPdfFields(pdfBytes);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async () => {
    if (file) {
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
            } else {
              console.warn(`Field "${fieldName}" not found. Skipping...`);
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
        a.download = 'annotated-form.pdf';
        a.click();
        URL.revokeObjectURL(url);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h2>PDF Form Filling</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Load PDF Fields</button>
      {fieldNames.length > 0 && (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {fieldNames.map((fieldName) => (
            <div key={fieldName}>
              <label>{fieldName}</label>
              <input
                type="text"
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PdfFormFilling;
