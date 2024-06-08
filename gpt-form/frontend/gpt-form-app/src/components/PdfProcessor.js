// src/components/PdfProcessor.js

import { PDFDocument } from 'pdf-lib';

const loadPdfFields = async (pdfBytes) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    return fields.map((field) => field.getName());
};

const processPdfFiles = async (files, formData, onFieldNamesChange) => {
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
                onFieldNamesChange(Array.from(fieldNamesIntersection));
            }
        };
        reader.readAsArrayBuffer(file);
    }
};

const submitPdfFiles = async (files, formData) => {
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

export { processPdfFiles, submitPdfFiles };
