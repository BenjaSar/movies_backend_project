// Controller/genreController.js
const db = require('../db/db');

const getAllGenres = (req, res) => {
    db.query('SELECT * FROM genres', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows);
    });
};

const getGenreById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.query('SELECT * FROM genres WHERE id = $1', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results.rows[0]);
    });
};

const createGenre = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO genres (name) VALUES ($1) RETURNING *', [name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(results.rows[0]);
    });
};

const updateGenre = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    db.query(
        'UPDATE genres SET name = $1 WHERE id = $2 RETURNING *',
        [name, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results.rows[0]);
        }
    );
};

const deleteGenre = (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.query('DELETE FROM genres WHERE id = $1', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
};

module.exports = {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre,
};
