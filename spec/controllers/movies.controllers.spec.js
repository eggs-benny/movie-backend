require("../mongodb_helper")
const Movie = require('../../models/movie');
const request = require('supertest');
const app = require('../../app');

beforeEach(async () => {
  await Movie.deleteMany({});
});

describe('/movies', () => {
  test('POST, when title, director & year are provided, the response code is 201', async () => {
    const response = await request(app)
      .post('/movies')
      .send({ title: 'Jurassic Park', director: 'Steven Spielberg', year: 1993, rating: 9.3,  genre: 'Adventure' });
    expect(response.statusCode).toBe(201);
  });

  test('POST, when title, director & year are provided, a movie is created', async () => {
    await request(app)
      .post('/movies')
      .send({ title: 'Jurassic Park', director: 'Steven Spielberg', year: 1993, rating: 9.3, genre: 'Adventure' });

    const movies = await Movie.find();
    const newMovie = movies[movies.length - 1];

    expect(newMovie.title).toBe('Jurassic Park');
    expect(newMovie.director).toBe('Steven Spielberg');
    expect(newMovie.year).toBe(1993);
  });
});
