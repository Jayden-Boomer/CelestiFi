import express from 'express';
import pkg from 'body-parser';
const { urlencoded } = pkg;
// import { urlencoded } from 'body-parser';
import { join } from 'path';
import fetchData from './index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index2.html'));
});

// Handle form submission
app.post('/submit-date', (req, res) => {
  const selectedDate = req.body.date;
  console.log('Selected date:', selectedDate); // Log the submitted date
  const files = fetchData();
  filterFiles(selectedDate);
  res.send(/*`Date received: ${selectedDate}`*/);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

function filterFiles(selectedDate) {
  const filteredFiles = files.filter(file => new Date(file.keyvalues.date) < selectedDate);
  renderFiles(filteredFiles);
}

function renderFiles(files) {
  const resultsContainer = document.getElementById('response');
  resultsContainer.innerHTML = ''; // Clear previous results
  if (files.length === 0) {
      resultsContainer.innerHTML = '<p>No files found for the selected date.</p>';
      return;
  }
  files.forEach(file => {
      const fileElement = document.createElement('div');
      fileElement.classList.add('file-item');
      fileElement.textContent = 'Name: ' + file.name + ', Date: '+ new Date(file.keyvalues.date).toLocaleString() +', Size:'+ file.size + ' bytes';
      resultsContainer.appendChild(fileElement);
  });
}

//3691
/**
 * functions
 */