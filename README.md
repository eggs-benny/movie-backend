# Movie Database Backend
This is a movie database backend app that allows you to store and retrieve movies with a title, director, year, genre, and rating.

The backend is written in Node.js and uses MongoDB as its database, with Mongoose ODM. API endpoints are exposed to store new movies and fetch the 3 most recently released movies in the database by year. Additionally, the app has been containerized using Docker for easy deployment.

## Installation
To run this app locally, you will need to have Node.js and MongoDB installed on your machine.
- Clone the repository (`https://github.com/eggs-benny/movie-backend.git`)
- Navigate to the project directory
- Run `npm install` to install the necessary dependencies.
- To start the app in the development server, run: `npm start`
- You can then access the app locally on `http://localhost:3000/movies`

## Dependencies
This project includes the following dependencies:

- body-parser
- docker
- docker-compose
- express
- mongodb
- mongoose
- jest
- supertest

## Usage
### API Endpoints
The following endpoints are available:

- GET /movies/recent - Fetches the 3 most recently released movies in the database by year. (The DB will start empty, you will need to post a movie before you get get one)

- POST /movies - Adds a new movie to the database. Try it using `Postman`

### Request Body
The POST /movies endpoint expects a JSON request body with the following properties:

title (string) - The title of the movie (must use european characters)
director (string) - The director of the movie (must be a real name)
year (integer) - The year the movie was released (must be an integer between 1895 - 2025)
genre (string) - The genre of the movie (must be a single word, using european characters)
rating (float) - The rating of the movie (must be between 0 - 10, can use decimal places)

Here's an example request body:

{
  "title": "Lost In Translation",
  "director": "Sofia Coppola",
  "year": 2003,
  "genre": "Romance",
  "rating": 8.7
}

## Testing
Run `npm run test` for the testing suite, covering the database and API.

Good test coverage, with exception of some error testing:
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------|---------|----------|---------|---------|-------------------
All files                  |   94.11 |       50 |      90 |   94.11 |                   
 movie-backend             |   93.33 |       50 |      50 |   93.33 |                   
  app.js                   |   92.85 |       50 |      50 |   92.85 | 24                
  config.js                |     100 |      100 |     100 |     100 |                   
 movie-backend/controllers |   84.61 |      100 |     100 |   84.61 |                   
  movies.controller.js     |   84.61 |      100 |     100 |   84.61 | 18,27             
 movie-backend/models      |     100 |      100 |     100 |     100 |                   
  movie.js                 |     100 |      100 |     100 |     100 |                   
 movie-backend/routes      |     100 |      100 |     100 |     100 |                   
  movies.js                |     100 |      100 |     100 |     100 |                   
 movie-backend/spec        |     100 |      100 |     100 |     100 |                   
  mongodb_helper.js        |     100 |      100 |     100 |     100 |                   
---------------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       20 passed, 20 total

## Docker
The database and backend are both stored in Docker containers, to be used on any machine.
To run the app using Docker, make sure you have Docker installed locally on your machine and the daemon running.
Build the Docker images, and start the containers using the following command:

`docker-compose up --build`
Then, start a container using the following command:

You can then access the app on `http://localhost:3000/movies`, and post using `Postman`.

Once you are done, you can take the images down with `docker-compose down`

### Data
N.B when running Docker, a data volume will be stored locally in your cloned directory to allow for persistence, and for easy removal if you want to remove the app.

## Assumptions & comments
- It is assumed that users of the database will be using European characters for movie entries.
- It would be possible to return all values within the database but this was not a requirement of the task.
- The testing suite may show a failed test on first or second attempt. I haven't managed to fully debug, but believe it is an async-await issue on first use of the database.
- Tests work locally, but not within the Docker environment.
- There is good test coverage, but more edge cases could be done around text entry.
- On using Docker, For the purposes of demonstration, I have used standard 'admin' and 'password' as login details. This would need to be more secure in a production environment.
- The aim will be to also deploy to AWS using Terraform.

## Contributing
If you would like to contribute to this project, feel free to submit a pull request.
Please make sure to follow the existing coding style and include tests for any new functionality.