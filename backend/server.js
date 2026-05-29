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


// ==============================
// MODELO DE DONACIÓN
// ==============================
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


// ==============================
// MODELO DE PAQUETE
// ==============================
const PaqueteSchema = new mongoose.Schema({
  numeroGuia:       { type: String, unique: true },
  remitente:        { type: String, required: true },
  destinatario:     { type: String, required: true },
  direccionDestino: { type: String, required: true },
  peso:             Number,
  dimensiones:      String,
  estado:           { type: String, default: "En bodega", enum: ["En bodega", "En ruta", "Entregado", "Incidencia"] },
  repartidor:       { type: String, default: "Sin asignar" },
  fecha:            { type: Date, default: Date.now }
});

// Generar número de guía automáticamente (fix: sin next)
PaqueteSchema.pre("save", async function() {
  if (!this.numeroGuia) {
    const count = await Paquete.countDocuments();
    this.numeroGuia = "RR-" + String(count + 1).padStart(5, "0");
  }
});

const Paquete = mongoose.model("Paquete", PaqueteSchema);


// ==============================
// MODELO DE REPARTIDOR
// ==============================
const RepartidorSchema = new mongoose.Schema({
  nombre:    { type: String, required: true },
  telefono:  String,
  vehiculo:  String,
  lat:       { type: Number, default: () => 4.6 + (Math.random() * 0.1 - 0.05) },
  lng:       { type: Number, default: () => -74.08 + (Math.random() * 0.1 - 0.05) },
  activo:    { type: Boolean, default: true }
});

const Repartidor = mongoose.model("Repartidor", RepartidorSchema);

async function crearRepartidoresPrueba() {
  const count = await Repartidor.countDocuments();
  if (count === 0) {
    await Repartidor.insertMany([
      { nombre: "Carlos Méndez", telefono: "3001234567", vehiculo: "Moto", lat: 4.6097, lng: -74.0817 },
      { nombre: "Laura Gómez",   telefono: "3009876543", vehiculo: "Bicicleta", lat: 4.6200, lng: -74.0750 },
      { nombre: "Pedro Ruiz",    telefono: "3005551234", vehiculo: "Moto", lat: 4.6050, lng: -74.0900 }
    ]);
    console.log("✅ Repartidores de prueba creados");
  }
}
crearRepartidoresPrueba();


// ==============================
// ENDPOINTS DE DONACIONES
// ==============================

app.get("/api/donaciones", async (req, res) => {
  try {
    const donaciones = await Donacion.find().sort({ fecha: -1 });
    res.json(donaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener donaciones" });
  }
});

app.post("/api/donaciones", async (req, res) => {
  try {
    const nueva = new Donacion(req.body);
    await nueva.save();
    res.status(201).json({ mensaje: "Donación registrada", donacion: nueva });
  } catch (error) {
    res.status(400).json({ error: "Datos inválidos" });
  }
});

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


// ==============================
// ENDPOINTS DE PAQUETES
// ==============================

app.get("/api/paquetes", async (req, res) => {
  try {
    const paquetes = await Paquete.find().sort({ fecha: -1 });
    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener paquetes" });
  }
});

app.post("/api/paquetes", async (req, res) => {
  try {
    const nuevo = new Paquete(req.body);
    await nuevo.save();
    res.status(201).json({ mensaje: "Paquete registrado", paquete: nuevo });
  } catch (error) {
    res.status(400).json({ error: "Datos inválidos", detalle: error.message });
  }
});

app.get("/api/paquetes/:guia", async (req, res) => {
  try {
    const paquete = await Paquete.findOne({ numeroGuia: req.params.guia });
    if (!paquete) return res.status(404).json({ error: "Paquete no encontrado" });
    res.json(paquete);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar paquete" });
  }
});

app.put("/api/paquetes/:id", async (req, res) => {
  try {
    const paquete = await Paquete.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paquete) return res.status(404).json({ error: "Paquete no encontrado" });
    res.json({ mensaje: "Paquete actualizado", paquete });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar paquete" });
  }
});


// ==============================
// ENDPOINTS DE REPARTIDORES
// ==============================

app.get("/api/repartidores", async (req, res) => {
  try {
    const repartidores = await Repartidor.find({ activo: true });
    res.json(repartidores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener repartidores" });
  }
});

app.get("/api/repartidores/ubicaciones", async (req, res) => {
  try {
    const repartidores = await Repartidor.find({ activo: true });
    const ubicaciones = repartidores.map(r => ({
      _id:      r._id,
      nombre:   r.nombre,
      vehiculo: r.vehiculo,
      lat:      r.lat + (Math.random() * 0.002 - 0.001),
      lng:      r.lng + (Math.random() * 0.002 - 0.001)
    }));
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ubicaciones" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));