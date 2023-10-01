const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const fs = require('fs');
const session = require('express-session');
const bodyParser = require('body-parser'); // Import body-parser

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);



// Increase the payload size limit for JSON requests (adjust 'limit' as needed)
app.use(express.json({ limit: '50mb' })); // Set your desired payload size limit

app.use(cors());

app.use(require('./route/auth'));


// Define an API endpoint to serve files from the 'data' folder
app.get('/api/data/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = `./profiles/${fileName}.json`; // Assuming files are in the 'data' folder

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist
      return res.status(404).json({ error: 'File not found' });
    }

    // Read the file and send its contents as JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (error) {
        res.status(500).json({ error: 'Error parsing JSON data' });
      }
    });
  });
});
app.get('/api/savedfiles/:fileName', (req, res) => {
  const { fileName } = req.params;
  const filePath = `./savedData/${fileName}.json`; // Assuming files are in the 'data' folder

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist
      return res.status(404).json({ error: 'File not found' });
    }

    // Read the file and send its contents as JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (error) {
        res.status(500).json({ error: 'Error parsing JSON data' });
      }
    });
  });
});







app.listen(port, () => {
  console.log(`Express.js backend is listening on port ${port}`);
});
