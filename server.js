//---Load express into my  application
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

// // Always require and configure near the top
// require('dotenv').config();
// // Connect to the database
// require('./config/database');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to the database
app.use(logger('dev'));
app.use(express.json());//app.use(express.json({ extended: false }));

// app.use(express.static(path.join(__dirname, 'build')));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/book', require('./routes/api/books'));
app.use('/api/order', require('./routes/api/orders'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static('uploads'));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/books', ensureLoggedIn, require('./routes/api/books'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
