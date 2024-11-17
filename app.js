//app.js


import { createServer } from 'http'
import * as fs from 'node:fs';

// import { fileURLToPath } from 'url';

// Get the directory name from the current module's URL
// const __filename = fileURLToPath(import.meta.url);

const port = 8080;

const server = createServer((req, res) => {
    // Define the path to the HTML file
    const filePath = "index.html"//path.join(__dirname, 'index.html');

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