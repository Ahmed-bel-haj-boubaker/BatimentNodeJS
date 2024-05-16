const mongoose = require("mongoose");

const NiveauSchema = new mongoose.Schema(
  {
    nom: String,
    nbrChambre: Number,
    etatConstruction: Boolean,
    idBatiment: {
      type: mongoose.Schema.ObjectId,
      ref: "Batiment",
    },
  },
  { timestamps: true }
);

const Niveau = mongoose.model("Niveau", NiveauSchema);
module.exports = Niveau;
