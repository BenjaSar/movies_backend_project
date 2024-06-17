const db = require("../db/db");

const getAllMovies = (req, res) => {
  const sql = "SELECT * FROM movies";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
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
  const { nombre, apellido, mail } = req.body;
  const sql = "INSERT INTO movies (zzzz,zzzzz, zzz) VALUES (?,?,?)";

  db.query(sql, [nombre, apellido, mail], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "The movie was create with  succes!",
      idUsuario: result.insertId,
    });
  });
};

const updateMovie = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, mail } = req.body;

  const sql =
    "UPDATE usuarios SET nombre = ?, apellido = ? , mail = ? WHERE id = ?";

  db.query(sql, [nombre, apellido, mail, id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Usuario EDITADO",
    });
  });
};

const deleteMovie = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM usuarios WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "usuario ELIMINADO con EXITO",
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
