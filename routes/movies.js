const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controller');

router.post('/', moviesController.storeMovie);
router.get('/', moviesController.fetchMovies);

module.exports = router;