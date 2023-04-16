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

  test('GET, get all movies, returns empty array when no movies in the database', async () => {
    const response = await request(app).get('/movies');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
  
  test('GET, get all movies, returns single movie in movies array', async () => {
    await Movie.create({ title: 'Jurassic Park', director: 'Steven Spielberg', year: 1993, rating: 9.3, genre: 'Adventure' });

    const response = await request(app).get('/movies');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Jurassic Park');
    expect(response.body[0].director).toBe('Steven Spielberg');
    expect(response.body[0].year).toBe(1993);
    expect(response.body[0].rating).toBe(9.3);
    expect(response.body[0].genre).toBe('Adventure');
  });
});


//   })

//   describe("POST, when password is missing", () => {
//     test("response code is 400", async () => {
//       let response = await request(app)
//         .post("/movies")
//         .send({email: "skye@email.com"})
//       expect(response.statusCode).toBe(400)
//     });

//     test("does not create a movie", async () => {
//       await request(app)
//         .post("/movies")
//         .send({email: "skye@email.com"})
//         let movies = await Movie.find()
//         expect(movies.length).toEqual(0)
//     });
//   })
  
//   describe("POST, when email is missing", () => {
//     test("response code is 400", async () => {
//       let response = await request(app)
//         .post("/movies")
//         .send({password: "1234"})
//       expect(response.statusCode).toBe(400)
//     });

//     test("does not create a movie", async () => {
//       await request(app)
//         .post("/movies")
//         .send({password: "1234"})
//       let movies = await Movie.find()
//       expect(movies.length).toEqual(0)
//     });
//   })
// })