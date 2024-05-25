// utils/pdfManipulation.js
const { PDFDocument, StandardFonts } = require('pdf-lib');
// import * as fs from 'node:fs/promises';
// const { readFile, writeFile } = require('fs/promises'); 
// import { promises as fs } from "fs";
const fs = require('fs')

async function createPdf(input, output, userInput) {
  try {
    const pdfDoc = await PDFDocument.load(await readFile(input));

    // Get all text field names
    const fieldNames = pdfDoc.getForm().getFields().map(field => field.getName());

    // Prompt user for input for each field
    const userInput = {};
    for (const fieldName of fieldNames) {
      const userInputText = await new Promise((resolve) => {
        readline.question(`Enter input for field "${fieldName}": `, resolve);
      });
      userInput[fieldName] = userInputText.trim(); // Trim leading/trailing whitespace
    }
    
    // Update text fields with user input
    const form = pdfDoc.getForm();
    for (const [fieldName, value] of Object.entries(userInput)) {
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
    
    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();
    await writeFile(output, pdfBytes);
    console.log(`PDF created: ${output}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

export default createPdf;