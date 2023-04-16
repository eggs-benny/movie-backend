const express = require('express')
const bodyParser = require('body-parser')
const moviesRouter = require('./routes/movies')

const app = express();

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/moviedbdev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err)

  });

app.use(bodyParser.json())
app.use('/movies', moviesRouter)

module.exports = app;