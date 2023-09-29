const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
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

app.listen(port, () => {
  console.log(`Express.js backend is listening on port ${port}`);
});
