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
  const { name, surname, gender, birthday, mail, national_document_identity } =
    req.body;

  const sql =
    "INSERT INTO users (name,surname,gender, birthday, mail, national_document_identity) VALUES (?,?,?,?,?,?)";

  db.query(
    sql,
    [name, surname, gender, birthday, mail, national_document_identity],
    (err, result) => {
      if (err) throw err;

      res.json({
        mensaje: "User generated succesfully.",
        idUsuario: result.insertId,
      });
    }
  );
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, surname, gender, mail } =
    req.body;

  const sql =
    "UPDATE users SET name = ?, surname = ? , gender = ?,  mail= ? WHERE id = ?";

  db.query(
    sql,
    [name, surname, gender, mail, id],
    (err, result) => {
      if (err) throw err;
      res.json({
        message: "Records updated successfully.",
      });
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      mensaje: "The data user was deleted succesfully.",
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
