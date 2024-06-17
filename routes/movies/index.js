const express = require('express');
const routerMovies = express.Router();
const movieController = require('../../controller/movieController');


routerMovies.get('/', movieController.getAllMovies);
routerMovies.get('/:id',movieController.getMoviesById);
routerMovies.post('/',movieController.createMovie);
routerMovies.put('/:id',movieController.updateMovie);
routerMovies.delete('/:id',movieController.deleteMovie);



module.exports = routerMovies;

