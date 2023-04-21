const mongoose = require('mongoose');
require('../mongodb_helper');
const Movie = require('../../models/movie');

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe('Storing movies successfully', () => {
  test('Store a movie in MongoDB', async () => {
    const movie = new Movie({
      title: 'Jurassic Park',
      director: 'Steven Spielberg',
      year: 1993,
      genre: 'Adventure',
      rating: 9.3
    });
    const savedMovie = await movie.save();
    expect(savedMovie.title).toEqual('Jurassic Park');
    expect(savedMovie.director).toEqual('Steven Spielberg');
    expect(savedMovie.year).toEqual(1993);
    expect(savedMovie.genre).toEqual('Adventure');
    expect(savedMovie.rating).toEqual(9.3);
  });

  test('Store a movie in MongoDB, no genre or rating', async () => {
    const movie = new Movie({
      title: 'Interstellar',
      director: 'Christopher Nolan',
      year: 2014
    });
    const savedMovie = await movie.save();
    expect(savedMovie).not.toBeNull();
    expect(savedMovie.title).toEqual('Interstellar');
    expect(savedMovie.director).toEqual('Christopher Nolan');
    expect(savedMovie.year).toEqual(2014);
  });
});

describe('Storing movie validation errors', () => {
  test('Missing Year', async () => {
    const movie = new Movie({
      title: 'Interstellar',
      director: 'Christopher Nolan',
      rating: '8.2',
      genre: 'Sci-fi'
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: year: Path `year` is required.'
    );
  });

  test('missing director', async () => {
    const movie = new Movie({
      title: 'The Dark Knight',
      year: 2008,
      rating: 8.4,
      genre: 'Superhero'
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: director: Path `director` is required.'
    );
  });
});

test('missing title', async () => {
  const movie = new Movie({
    director: 'Christopher Nolan',
    year: 2020,
    genre: 'Sci-Fi',
    rating: 6.5
  });
  await expect(movie.save()).rejects.toThrow(
    'Movie validation failed: title: Path `title` is required.'
  );
});

describe('Successfully fetching a movie saved in MongoDB', () => {
  test('Fetch a movie from MongoDB', async () => {
    const movie = new Movie({
      title: 'Lost In Translation',
      director: 'Sofia Coppola',
      year: 2003,
      genre: 'Romance',
      rating: 8.2
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
