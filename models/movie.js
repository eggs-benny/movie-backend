const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  year: {
    type: NumberInt,
    required: true
  },
  genre: {
    type: String
  },
  rating: {
    type: NumberDecimal
  }
});

module.exports = mongoose.model('Movie', movieSchema);