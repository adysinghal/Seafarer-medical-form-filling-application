// src/components/PdfProcessor.js

import { PDFDocument } from 'pdf-lib';

const fetchPdfBytes = async (fileUrl) => {
    const response = await fetch(fileUrl);
    return await response.arrayBuffer();
};

const loadPdfFields = async (pdfBytes) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    return fields.map((field) => field.getName());
};

const processPdfFiles = async (fileUrls, formData, onFieldNamesChange) => {
    let fieldNamesIntersection = new Set();

    for (const fileUrl of fileUrls) {
        const pdfBytes = await fetchPdfBytes(fileUrl);
        const currentFileFields = new Set(await loadPdfFields(pdfBytes));

        if (fieldNamesIntersection.size > 0) {
            fieldNamesIntersection = new Set(
                [...fieldNamesIntersection].filter((field) => currentFileFields.has(field))
            );
        } else {
            fieldNamesIntersection = new Set([...currentFileFields]);
            onFieldNamesChange(Array.from(fieldNamesIntersection));
        }
    }
};

const submitPdfFiles = async (fileUrls, formData) => {
    let index = 0;
    for (const fileUrl of fileUrls) {
        const pdfBytes = await fetchPdfBytes(fileUrl);
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
        index++;
    }
};

export { processPdfFiles, submitPdfFiles };
