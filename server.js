const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./dbConnection/dbConnection");
const BatimentRoute = require("./routes/batimentRoute");
const NiveauRoute = require("./routes/niveauRoute");

const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const Niveau = require("./model/Niveau");
const Batiment = require("./model/Batiment");

dotenv.config({ path: ".env" });

dbConnection();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", async (socket) => {
  console.log("Client connected");
  const niveauNonBati = await Niveau.find({ etatConstruction: false });

  console.log(niveauNonBati);
  socket.emit("getNiveauNonBati", niveauNonBati);

  socket.on("construction", async (niveau) => {
    const { _id } = niveau;

    try {
      const niveau = await Niveau.findById(_id);

      if (niveau.etatConstruction === false) {
        const idBatiment = niveau.idBatiment;
        const batiment = await Batiment.findById(idBatiment);

        batiment.nbrNiveau = batiment.nbrNiveau + 1;

        await batiment.save();

        niveau.etatConstruction = true;
        await niveau.save();
      }
    } catch (error) {
      console.error(error);
    }
    const niveauNonBati = await Niveau.find({ etatConstruction: false });

    console.log(niveauNonBati);
    socket.emit("getNiveauNonBati", niveauNonBati);
  });
  socket.on("afficherSomme", async () => {
    try {
      const somme = await Batiment.find({
        nbrNiveau: { $gt: 5 },
        address: "Tunis",
      }).countDocuments();

      socket.emit("somme", somme);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/batiment", BatimentRoute);
app.use("/niveau", NiveauRoute);
app.get("/view", (req, res) => {
  res.render("view");
});
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} `);
});
