const db = require("../db/db");

const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, results) => {
    if (err) throw err;

    res.json(results);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuarios WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json(result);
  });
};

const createUser = (req, res) => {
  const { nombre, apellido, mail } = req.body;

  const sql = "INSERT INTO usuarios (nombre,apellido,mail) VALUES (?,?,?)";

  db.query(sql, [nombre, apellido, mail], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "Usuario Creado con EXITO",
      idUsuario: result.insertId,
    });
  });
};

const updateUser = (req, res) => {
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

const deleteUser = (req, res) => {
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
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
