const mongoose = require('mongoose');
require('../mongodb_helper')
const Movie = require('../../models/movie');
beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe('Movie model', () => {
  test('Store a movie in MongoDB', async () => {
    const movie = new Movie({
      title: 'Jurassic Park',
      director: 'Steven Spielberg',
      year: 1993,
      genre: 'Adventure',
      rating: 9.3,
    });
    const savedMovie = await movie.save();
    expect(savedMovie.title).toEqual('Jurassic Park');
    expect(savedMovie.director).toEqual('Steven Spielberg');
    expect(savedMovie.year).toEqual(1993);
    expect(savedMovie.genre).toEqual('Adventure');
    expect(savedMovie.rating).toEqual(9.3);
  });

  test('Fetch a movie from MongoDB', async () => {
    const movie = new Movie({
      title: 'Lost In Translation',
      director: 'Sofia Coppola',
      year: 2003,
      genre: 'Romance',
      rating: 8.2,
    });
    await movie.save();

    const fetchedMovie = await Movie.findOne({ title: 'Lost In Translation' });
    expect(fetchedMovie.title).toEqual('Lost In Translation');
    expect(fetchedMovie.director).toEqual('Sofia Coppola');
    expect(fetchedMovie.year).toEqual(2003);
    expect(fetchedMovie.genre).toEqual('Romance');
    expect(fetchedMovie.rating).toEqual(8.2);
  });
});
