const express = require("express");

const app = express();

const {register, login, generatetoken} = require("./controller/auth_controller");
app.use(express.json());

app.post("/register", register)
app.post("/login", login)

module.exports = app;