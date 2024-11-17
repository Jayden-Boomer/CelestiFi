//app.js

import { createServer } from 'http'
import * as fs from 'node:fs';

// import { fileURLToPath } from 'url';

// Get the directory name from the current module's URL
// const __filename = fileURLToPath(import.meta.url);

const port = 8080;

// Initialize the files variable
let files = [];

// Load files when the server starts
(async () => {
    files = await getFiles();
})();

const server = createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/files-by-date') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            const { date } = JSON.parse(body);
            const selectedDate = new Date(date);
            const filteredFiles = files.filter(file => file.date <= selectedDate);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ files: filteredFiles }));
        });
    } else {
        // Define the path to the HTML file
        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                console.error('Error reading file:', err);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});
//.listen(8080); //the server object listens on port 8080

// Set up our server so it will listen on the port
server.listen(port, function (error) {

    // Checking any error occur while listening on port
    if (error) {
        console.log('Something went wrong', error);
    }
    // Else sent message of listening
    else {
        console.log('Server is listening on port' + port);
    }
})