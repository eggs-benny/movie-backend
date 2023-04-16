const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/moviedbtest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});