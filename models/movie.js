const mongoose = require('mongoose');
const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
const filmNameRegex = /^[a-zA-Z0-9\s\-',.!?:;()+&$%#@*À-ÖØ-öø-ÿ]+$/;
const genreRegex = /^[a-zA-Z-&À-ÖØ-öø-ÿ]+$/;


const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: function(valid) {
        return filmNameRegex.test(valid);
      },
      message: 'please enter a valid film name'
    }
  },
  director: {
    type: String,
    required: true,
    validate: {
      validator: function(valid) {
        return nameRegex.test(valid);
      },
      message: 'please enter a valid director name'
    }
  },
  year: {
    type: Number,
    required: true,
    validate: {
      validator: function(valid) {
        return Number.isInteger(valid);
      },
      message: 'year must be an integer'
    },
    min: [1895, 'year cannot be earlier than 1895'],
    max: [2025, 'year cannot be after 2025']
  },
  genre: {
    type: String,
    validate: {
      validator: function(valid) {
        return genreRegex.test(valid);
      },
      message: 'please enter a valid genre, no special chars or numbers, must be one word only'
    }
  },
  rating: {
    type: Number,
    min: [0, 'rating cannot be less than 0/10'],
    max: [10, 'rating cannot be more than 10/10']
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie