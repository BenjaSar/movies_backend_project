const express = require("express");
const routerUsers = express.Router();
const userController = require("../../controller/userController");

routerUsers.get("/", userController.getAllUsers);
routerUsers.get("/:id", userController.getUserById);
routerUsers.post("/", userController.createUser);
routerUsers.put("/:id", userController.updateUser);
routerUsers.delete("/:id", userController.deleteUser);

module.exports = routerUsers;
