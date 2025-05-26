// routes/empleados.js
const express = require('express');
const router = express.Router();

// Controlador o función para manejar POST /empleados
router.post('/', async (req, res) => {
  try {
    const { nombre, email, descripcion } = req.body;

    // Validación del servidor
    if (!nombre || !email) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Simulación de guardado (puedes usar mongoose, sequelize, etc.)
    const nuevoEmpleado = {
      id: Date.now(), // temporal, en lugar de ID de base de datos
      nombre,
      email,
      descripcion
    };

    // Simulación: guardar en una "base de datos"
    console.log("Empleado guardado:", nuevoEmpleado);

    res.status(201).json({ mensaje: "Empleado creado", data: nuevoEmpleado });
  } catch (error) {
    console.error("Error al crear empleado:", error);
    res.status(500).json({ error: "Error del servidor al crear empleado" });
  }
});

module.exports = router;
