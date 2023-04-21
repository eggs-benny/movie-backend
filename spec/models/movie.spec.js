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

  test('min year is before 1895', async () => {
    const movie = new Movie({
      title: 'No film',
      director: 'Lumiere Brothers',
      year: 1894,
      genre: 'Documentary',
      rating: 3.2
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: year: year cannot be earlier than 1895'
    );
  });

  test('min year is after 2025', async () => {
    const movie = new Movie({
      title: 'Avengers: Secret Wars',
      director: 'TBC',
      year: 2026,
      genre: 'Superhero',
      rating: 6.0
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: year: year cannot be after 2025'
    );
  });

  test('year must be an integer', async () => {
    const movie = new Movie({
      title: 'Goodfellas',
      director: 'Martin Scorsese',
      year: 1990.2,
      genre: 'Crime',
      rating: 8.5
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: year: year must be an integer'
    );
  }); 

  test('rating must not be negative', async () => {
    const movie = new Movie({
      title: 'Transformers',
      director: 'Michael Bay',
      year: 2007,
      genre: 'Action',
      rating: -2.4
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: rating: rating cannot be less than 0/10'
    );
  }); 

  test('rating must not be >10', async () => {
    const movie = new Movie({
      title: 'Spinal Tap',
      director: 'Rob Reiner',
      year: 1984,
      genre: 'Mockumentary',
      rating: 11
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: rating: rating cannot be more than 10/10'
    );
  }); 

  test('movie title must use standard european characters', async () => {
    const movie = new Movie({
      title: '[]{}{}]',
      director: 'Elon Musk',
      year: 2023,
      genre: 'Mockumentary',
      rating: 1
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: title: please enter a valid film name'
    );
  }); 

  test('movie director must use a real name, no numbers', async () => {
    const movie = new Movie({
      title: 'AI Film',
      director: '10101',
      year: 2023,
      genre: 'Documentary',
      rating: 7.5
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: director: please enter a valid director name'
    );
  }); 

  test('movie genre must use standard european characters', async () => {
    const movie = new Movie({
      title: 'A Beautiful Mind',
      director: 'Ron Howard',
      year: 2001,
      genre: '2+2',
      rating: 6.3
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: genre: please enter a valid genre, no special chars or numbers, must be one word only'
    );
  }); 

  test('movie genre must be a single word', async () => {
    const movie = new Movie({
      title: 'Anchorman',
      director: 'Adam McKay',
      year: 2004,
      genre: 'Com edy',
      rating: 7.0
    });
    await expect(movie.save()).rejects.toThrow(
      'Movie validation failed: genre: please enter a valid genre, no special chars or numbers, must be one word only'
    );
  }); 
});
