const express = require("express");
const {
  addBatiment,
  getAllBatiment,
  getbatimentById,
  deleteBatiment,
} = require("../controller/batimentController");

const Router = express.Router();

Router.route("/newBatiment").post(addBatiment);
Router.route("/getAllbat").get(getAllBatiment);
Router.route("/getbat/:id").get(getbatimentById);
// Router.route("/updateJoueur/:id").put(updateJoueur);

Router.route("/deleteBatiment/:id").delete(deleteBatiment);
module.exports = Router;
