import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PdfFormFilling = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [fieldNames, setFieldNames] = useState([]);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
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
      const allFieldNames = new Set();
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const pdfBytes = event.target.result;
          const fields = await loadPdfFields(pdfBytes);
          fields.forEach((field) => allFieldNames.add(field));
          setFieldNames(Array.from(allFieldNames));
        };
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleSubmit = async () => {
    const downloadLinks = [];
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
        downloadLinks.push(url);
        const a = document.createElement('a');
        a.href = url;
        a.download = `annotated-form-${index + 1}.pdf`;
        index++;
        a.click();
        URL.revokeObjectURL(url);
      };
      reader.readAsArrayBuffer(file);
    }

    // downloadLinks.forEach((url, index) => {
    // });
  };

  return (
    <div>
      <h2>PDF Form Filling</h2>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
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
