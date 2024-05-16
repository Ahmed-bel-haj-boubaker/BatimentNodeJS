const express = require("express");
const { addNiveau, construction } = require("../controller/niveauController");

const Router = express.Router();

Router.route("/addNiveau").post(addNiveau);
Router.route("/contruction/:id").put(construction);

module.exports = Router;
