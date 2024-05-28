const { PDFDocument, StandardFonts } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');

const fetchFieldNames = async () => {
    const originalPdfPath = "form-fields-2.pdf";
    const data = await readFile(originalPdfPath);
    console.log("aDI");
    console.log(typeof(data));
};
fetchFieldNames();