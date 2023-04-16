var mongoose = require("mongoose");

// Connect to the 'moviedbtest' database before running tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/moviedbtest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Disconnect from the database after running tests
afterAll(async () => {
  await mongoose.connection.close();
});