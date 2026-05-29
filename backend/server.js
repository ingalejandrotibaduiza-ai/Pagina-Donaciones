const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("Error:", err));

// Modelo de donación
const DonacionSchema = new mongoose.Schema({
  nombre:    { type: String, required: true },
  correo:    { type: String, required: true },
  telefono:  String,
  ciudad:    String,
  tipo:      String,
  monto:     { type: Number, required: true },
  mensaje:   String,
  fecha:     { type: Date, default: Date.now }
});

const Donacion = mongoose.model("Donacion", DonacionSchema);

// GET todas las donaciones
app.get("/api/donaciones", async (req, res) => {
  try {
    const donaciones = await Donacion.find().sort({ fecha: -1 });
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener donaciones" });
  }
});

// POST crear donación
app.post("/api/donaciones", async (req, res) => {
  try {
    const nueva = new Donacion(req.body);
    await nueva.save();
    res.status(201).json({ mensaje: "Donación registrada", donacion: nueva });
  } catch (error) {
    res.status(400).json({ error: "Datos inválidos" });
  }
});

// GET buscar por nombre
app.get("/api/donaciones/buscar", async (req, res) => {
  try {
    const nombre = req.query.nombre || "";
    const donacion = await Donacion.findOne({
      nombre: { $regex: nombre, $options: "i" }
    });
    if (!donacion) return res.status(404).json({ error: "No encontrada" });
    res.json(donacion);
  } catch (error) {
    res.status(500).json({ error: "Error en búsqueda" });
  }
});

// GET estadísticas
app.get("/api/donaciones/stats", async (req, res) => {
  try {
    const total = await Donacion.countDocuments();
    const resultado = await Donacion.aggregate([
      { $group: { _id: null, suma: { $sum: "$monto" } } }
    ]);
    const suma = resultado[0]?.suma || 0;
    res.json({ total, suma });
  } catch (error) {
    res.status(500).json({ error: "Error en estadísticas" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));