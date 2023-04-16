const Movie = require('../models/movie');

const moviesController = {
  storeMovie: async (req, res) => {
    const { title, director, year, genre, rating } = req.body
    try {
      const movie = new Movie({
        title,
        director,
        year,
        genre,
        rating
      });

      const savedMovie = await movie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  fetchRecentMovies: async (req, res) => {
  try {
    const movies = await Movie.find().sort({ year: -1 }).limit(3);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
};

module.exports = moviesController