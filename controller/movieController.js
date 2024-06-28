const db = require("../db/db");

const getAllMovies = (req, res) => {
  try {
    const sql = "SELECT * FROM movies";

    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.log(error);
    return  res.status(500).send();
  }
};

const getMoviesById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM movies WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const createMovie = (req, res) => {
  const { name, release_dt, synopsis } = req.body;
  const sql = "INSERT INTO movies (name, release_dt, synopsis) VALUES (?,?,?)";

  db.query(sql, [name, release_dt, synopsis], (err, result) => {
    if (err) throw err;

    res.json({
      message: "The movie was created successfully!",
      idMovie: result.insertId,
    });
  });
};

const updateMovie = (req, res) => {
  const { id } = req.params;
  const { name, release_dt, synopsis } = req.body;

  const sql =
    "UPDATE movies SET name = ? , synopsis = ? WHERE id = ?";

  db.query(sql, [name, synopsis, id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "The record was updated succesfully.",
    });
  });
};

const deleteMovie = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM movies WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "The movie was deleted succesfully.",
    });
  });
};

module.exports = {
  getAllMovies,
  getMoviesById,
  createMovie,
  updateMovie,
  deleteMovie,
};
