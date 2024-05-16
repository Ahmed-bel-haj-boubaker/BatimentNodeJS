const Batiment = require("../model/Batiment");
const Niveau = require("../model/Niveau");

exports.addNiveau = async (req, res) => {
  const niveau = new Niveau(req.body);
  niveau.etatConstruction = false;

  niveau.save();

  res.status(201).json({ data: niveau });
};

exports.construction = async (req, res) => {
  const niveau = await Niveau.findById(req.params.id);

  if (niveau.etatConstruction === false) {
    const idBatiment = niveau.idBatiment;
    const batiment = await Batiment.findById(idBatiment);

    batiment.nbrNiveau = batiment.nbrNiveau + 1;

    await batiment.save();

    niveau.etatConstruction = true;
    await niveau.save();
  }

  return res.status(201).json({ data: niveau });
};
