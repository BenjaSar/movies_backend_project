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
  const sql = "SELECT * FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const createUser = (req, res) => {
  const { name, surname, gender,  birthday, mail, national_document_identity } = req.body;

  const sql = "INSERT INTO users (name,surname,gender, birthday, mail, national_document_identity) VALUES (?,?,?,?,?,?)";

  db.query(sql, [name, surname, gender,  birthday, mail, national_document_identity], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "User generated in succesful way",
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
      mensaje: "The data user was updated.",
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM usuarios WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "User deleted in succesful way.",
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
