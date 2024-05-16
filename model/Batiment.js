const mongoose = require("mongoose");

const BatimentSchema = new mongoose.Schema(
  {
    nom: String,
    nbrNiveau: Number,
    description: String,
    address: String,
  },
  { timestamps: true }
);

const Batiment = mongoose.model("Batiment", BatimentSchema);
module.exports = Batiment;
