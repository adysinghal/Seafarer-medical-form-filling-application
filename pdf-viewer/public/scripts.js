let pdfDoc = null;
let currentPage = null;
let pdfBytes = null;
const canvas = document.getElementById('pdfCanvas');
const context = canvas.getContext('2d');

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    console.error('Failed to upload PDF');
    return;
  }

  const result = await response.json();
  const pdfPath = result.filePath;

  const pdfjsLib = window['pdfjs-dist/build/pdf'];
  const loadingTask = pdfjsLib.getDocument(pdfPath);
  loadingTask.promise.then(async (pdf) => {
    pdfDoc = pdf;
    currentPage = await pdfDoc.getPage(1);
    const scale = 1.5;
    const viewport = currentPage.getViewport({ scale });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    currentPage.render(renderContext);

    pdfBytes = await fetch(pdfPath).then(res => res.arrayBuffer());
  }).catch(err => console.error('Error loading PDF: ', err));
});

document.getElementById('addTextButton').addEventListener('click', async () => {
  const text = document.getElementById('textInput').value;
  if (!text) {
    alert('Please enter some text');
    return;
  }

  const { PDFDocument } = PDFLib;
  const existingPdfDoc = await PDFDocument.load(pdfBytes);
  const pages = existingPdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  firstPage.drawText(text, {
    x: 50,
    y: height - 100,
    size: 30,
    color: PDFLib.rgb(0, 0, 0),
  });

  pdfBytes = await existingPdfDoc.save();
  alert('Text added to PDF!');
});

document.getElementById('saveButton').addEventListener('click', () => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'edited.pdf';
  link.click();
});
