const express = require('express');
const router = express.Router();
const Form = require('../models/form');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// Route to create a new form
router.post('/create', async (req, res) => {
  const { formName, fields } = req.body;
  const newForm = new Form({ formName, fields });
  await newForm.save();
  res.status(201).send(newForm);
});

// Route to get all forms
router.get('/', async (req, res) => {
  const forms = await Form.find();
  res.status(200).send(forms);
});

// Route to get fields for selected forms
router.post('/fields', async (req, res) => {
  const { formIds } = req.body;
  const forms = await Form.find({ '_id': { $in: formIds } });
  const fields = forms.reduce((acc, form) => {
    form.fields.forEach(field => {
      if (!acc.some(f => f.name === field.name)) {
        acc.push(field);
      }
    });
    return acc;
  }, []);
  res.status(200).send(fields);
});

// Route to handle form submission and PDF generation
router.post('/submit', async (req, res) => {
  try {
    const data = req.body;

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Add a blank page to the document
    const page = pdfDoc.addPage([600, 750]);

    // Set font size
    const fontSize = 12;

    // Write data to the PDF
    let yPosition = 700;
    for (const [key, value] of Object.entries(data)) {
      page.drawText(`${key}: ${value}`, {
        x: 50,
        y: yPosition,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Write the PDF to a file
    const filePath = path.join(__dirname, '..', 'output', `form_${Date.now()}.pdf`);
    fs.writeFileSync(filePath, pdfBytes);

    // Send back the PDF file path
    res.status(200).send({ filePath });
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
