/* TEST BACKEND */
const PORT = process.env.PORT || 3000;
const API_URL = 'https://randomfox.ca/floof/'

// THIS IS A MESS
const express = require('express');
const request = require('request');
const morgan = require('morgan');
const cors = require('cors');

// Initialize the app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Log all requests using the 'combined' format
app.use(morgan('combined'));

// Set the view engine to PugJS
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Request the image from API
app.get('/', (req, res) => {
  request(API_URL, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.render('random-fox', data);
    }
  });
});

// Start the server on the specifiec port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});