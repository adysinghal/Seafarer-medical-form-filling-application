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
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
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

        // Extract the 'First name' from formData
        const firstName = formData['First name'] || 'unknown';
        const middleName = formData['Middle name'] || '';
        const lastName = formData['Last name'] || '';

        // Extract the form name from the file URL
        const formName = fileUrl.split('/').pop().split('.').shift();

        // Create the new file name
        const newFileName = `${formName}-${firstName} ${middleName} ${lastName}-${currentDate}.pdf`;

        // Save the modified PDF
        const modifiedPdfBytes = await pdfDoc.save();
        const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = newFileName;
        a.click();
        URL.revokeObjectURL(url);
    }
};

export { processPdfFiles, submitPdfFiles };
