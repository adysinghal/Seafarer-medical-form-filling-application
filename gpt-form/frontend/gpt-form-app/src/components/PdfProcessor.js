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

const processPdfFiles = async (fileUrls, formData, onFieldsChange) => {
    const fieldCounts = {};
    const fileFields = {};

    // Collect fields from each PDF and count occurrences
    for (const fileUrl of fileUrls) {
        const pdfBytes = await fetchPdfBytes(fileUrl);
        const currentFileFields = await loadPdfFields(pdfBytes);
        fileFields[fileUrl] = currentFileFields;

        currentFileFields.forEach((field) => {
            if (fieldCounts[field]) {
                fieldCounts[field]++;
            } else {
                fieldCounts[field] = 1;
            }
        });
    }

    // Determine common fields and unique fields per PDF
    const commonFields = Object.keys(fieldCounts).filter((field) => fieldCounts[field] > 1);
    const individualFields = {};
    for (const fileUrl of fileUrls) {
        individualFields[fileUrl] = fileFields[fileUrl].filter((field) => !commonFields.includes(field));
    }

    // Update the state with common and individual fields
    onFieldsChange({ commonFields, individualFields });
};

const submitPdfFiles = async (fileUrls, formData) => {
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

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const getFormattedDate = (date) => {
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
        
        const currentDate = getFormattedDate(new Date());

        // Extract the form name from the file URL
        const formName = fileUrl.split('/').pop().split('.').shift();

        // Create the new file name
        const newFileName = `${currentDate}-${formName}-${firstName}${middleName ? ' ' + middleName : ''} ${lastName}.pdf`;

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
