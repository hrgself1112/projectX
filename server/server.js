// backend/server.js

const express = require('express');
const app = express();
const port = 8080; // Use the port of your choice
const cors = require('cors'); // Import the cors package
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json())

app.use(cors());

app.use(require('./route/auth'));


app.listen(port, () => {
  console.log(`Express.js backend is listening on port ${port}`);
});
