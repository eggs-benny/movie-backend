const express = require('express');
const bodyParser = require('body-parser');
const moviesRouter = require('./routes/movies');
const config = require('./config')

const app = express();

const mongoose = require('mongoose');

// Get the appropriate MongoDB connection string based on NODE_ENV
const dbURI = process.env.NODE_ENV === 'test'
  ? config.db.test
  : config.db.development;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
app.use(bodyParser.json());
app.use('/movies', moviesRouter);

module.exports = app;