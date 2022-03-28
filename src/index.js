const express = require("express");

const app = express();

const {register, login, generatetoken} = require("./controller/auth_controller");
const todoController = require("./controller/todo_controller");
app.use(express.json());

app.post("/register", register)
app.post("/login", login)

app.use("/todo", todoController);
module.exports = app;