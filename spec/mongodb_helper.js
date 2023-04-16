const mongoose = require("mongoose");
const config = require('../config')

beforeAll(async () => {
  await mongoose.connect(config.db.test, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});