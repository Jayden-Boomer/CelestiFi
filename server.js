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
app.post('/submit-date', async (req, res) => {
    const selectedDate = new Date(req.body.date);
    console.log('Selected date:', selectedDate);
    const files = await fetchData(selectedDate); // Make sure to await if it's async
    console.log("Files to send:", files); // Log files before sending
    res.send(files); // Send the files back to the client
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});



//3691
/**
 * functions
 */