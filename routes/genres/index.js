// routes/genres/index.js
const express = require('express');
const router = express.Router();
const genreController = require('../../controller/genreController');

router.get('/', genreController.getAllGenres);
router.get('/:id', genreController.getGenreById);
router.post('/', genreController.createGenre);
router.put('/:id', genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

module.exports = router;
