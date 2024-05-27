const { PDFDocument, StandardFonts } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');

const fetchFieldNames = async () => {
    const originalPdfPath = "form-fields-2.pdf";
    const pdfDoc = await PDFDocument.load(await readFile(originalPdfPath));
    const names = pdfDoc.getForm().getFields().map(field => field.getName());
    console.log(names);
};
fetchFieldNames();