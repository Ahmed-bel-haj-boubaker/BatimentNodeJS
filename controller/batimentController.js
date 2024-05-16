const Batiment = require("../model/Batiment");

exports.addBatiment = async (req, res) => {
  const newBatiment = new Batiment(req.body);
  newBatiment.nbrNiveau = 0;
  newBatiment.save();

  res.status(201).json({
    data: newBatiment,
    message: `Le Batiment a été ajouté avec succes: ${newBatiment.nom}`,
  });
};

exports.getAllBatiment = async (req, res) => {
  const batiments = await Batiment.find();
  res.status(200).json({
    data: batiments,
  });
};

exports.getbatimentById = async (req, res) => {
  const id = req.params.id;

  const batiment = await Batiment.findById(id);
  if (!batiment) {
    return res
      .status(404)
      .json({ message: `pas d'batiment avec cette id=${req.params.id}` });
  }

  return res.status(200).json({
    data: batiment,
  });
};

exports.deleteBatiment = async (req, res) => {
  const id = req.params.id;
  const deletedBatiment = await Batiment.findByIdAndDelete(id);
  if (!deletedBatiment) {
    return res
      .status(404)
      .json({ message: `pas d'batiment avec cette id=${id}` });
  }

  return res.status(200).json({
    message: `Batiment deleted `,
  });
};
