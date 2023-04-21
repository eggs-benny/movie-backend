require('../mongodb_helper');
const Movie = require('../../models/movie');
const request = require('supertest');
const app = require('../../app');

beforeEach(async () => {
  await Movie.deleteMany({});
});

describe('POST', () => {
  test('When title, director & year are provided, the response code is 201', async () => {
    const response = await request(app)
      .post('/movies')
      .send({
        title: 'Jurassic Park',
        director: 'Steven Spielberg',
        year: 1993,
        rating: 9.3,
        genre: 'Adventure'
      });
    expect(response.statusCode).toBe(201);
  });

  test('hen title, director & year are provided, a movie is created', async () => {
    await request(app)
      .post('/movies')
      .send({
        title: 'Jurassic Park',
        director: 'Steven Spielberg',
        year: 1993,
        rating: 9.3,
        genre: 'Adventure'
      });

    const movies = await Movie.find();
    const newMovie = movies[movies.length - 1];

    expect(newMovie.title).toBe('Jurassic Park');
    expect(newMovie.director).toBe('Steven Spielberg');
    expect(newMovie.year).toBe(1993);
  });
});

describe('GET', () => {
  test('returns empty array when no movies in the database', async () => {
    const response = await request(app).get('/movies/recent');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  test('With one movie in db returns single movie in movies array', async () => {
    await Movie.create({
      title: 'Jurassic Park',
      director: 'Steven Spielberg',
      year: 1993,
      rating: 9.3,
      genre: 'Adventure'
    });

    const response = await request(app).get('/movies/recent');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Jurassic Park');
    expect(response.body[0].director).toBe('Steven Spielberg');
    expect(response.body[0].year).toBe(1993);
    expect(response.body[0].rating).toBe(9.3);
    expect(response.body[0].genre).toBe('Adventure');
  });

  test('With one movie in db returns single movie in movies array', async () => {
    await Movie.create({
      title: 'Jurassic Park',
      director: 'Steven Spielberg',
      year: 1993,
      rating: 9.3,
      genre: 'Adventure'
    });
    await Movie.create({
      title: 'Lost in Translation',
      director: 'Sofia Coppola',
      year: 2003,
      rating: 8.2,
      genre: 'Romance'
    });
    await Movie.create({
      title: 'Apocalypse Now',
      director: 'Francis Ford Coppola',
      year: 1979,
      rating: 8.4,
      genre: 'War'
    });
    await Movie.create({
      title: 'The Royal Tenenbaums',
      director: 'Wes Anderson',
      year: 2001,
      rating: 9.0,
      genre: 'Comedy'
    });

    const response = await request(app).get('/movies/recent');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3); 
    expect(response.body[0].title).toBe('Lost in Translation');
    expect(response.body[0].director).toBe('Sofia Coppola');
    expect(response.body[0].year).toBe(2003);
    expect(response.body[0].rating).toBe(8.2);
    expect(response.body[0].genre).toBe('Romance');
  });
});
