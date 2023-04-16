const express = require('express');
const bodyParser = require('body-parser');
const moviesRouter = require('./routes/movies');
const config = require('./config')

const app = express();

const mongoose = require('mongoose');

const dbURIs = {
  test: config.db.test,
  production: config.db.production,
  development: config.db.development
};

// Determine the appropriate MongoDB connection string based on the environment
const dbURI = dbURIs[process.env.NODE_ENV] || dbURIs.development;

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