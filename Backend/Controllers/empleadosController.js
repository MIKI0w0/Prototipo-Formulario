const Empleado = require('../Models/Empleados.js'); // Import the Empleado model

const crearEmpleado = async (req, res) => {
  try {
    const { nombre, email, sexo, area_id, boletin, descripcion } = req.body;
    if (!nombre || !email || !sexo || !area_id || !descripcion) {
      return res.status(400).json({
        error: "Todos los campos obligatorios (nombre, email, sexo, área, descripción) son requeridos."
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "El formato del correo electrónico no es válido." });
    }
    if (sexo !== 'M' && sexo !== 'F') {
      return res.status(400).json({ error: "El campo 'sexo' debe ser 'M' o 'F'." });
    }
    const nuevoEmpleado = await Empleado.create({
      nombre,
      email,
      sexo,
      area_id,
      boletin: typeof boletin === 'boolean' ? boletin : false,
      descripcion
    });
    res.status(201).json({
      mensaje: "Empleado creado exitosamente.",
      data: nuevoEmpleado
    });

  } catch (error) {
    console.error("Error al crear empleado:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: "El correo electrónico ya está registrado." });
    } else if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error del servidor al crear el empleado." });
  }
};

const listarEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll(); 
    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ error: "Error del servidor al obtener los empleados." });
  }
};

const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params; 
    const result = await Empleado.destroy({
      where: { id: id }
    });

    if (result === 0) { 
      return res.status(404).json({ error: "Empleado no encontrado." });
    }
    res.status(200).json({ mensaje: "Empleado eliminado exitosamente." });

  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    res.status(500).json({ error: "Error del servidor al eliminar el empleado." });
  }
};

const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params; 
    const { nombre, email, sexo, area_id, boletin, descripcion } = req.body;

    if (!nombre || !email || !sexo || !area_id || !descripcion) {
      return res.status(400).json({ error: "Todos los campos obligatorios (nombre, email, sexo, área, descripción) son requeridos para la actualización." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "El formato del correo electrónico no es válido." });
    }
    if (sexo !== 'M' && sexo !== 'F') {
      return res.status(400).json({ error: "El campo 'sexo' debe ser 'M' o 'F'." });
    }

    const [updatedRows] = await Empleado.update({
      nombre,
      email,
      sexo,
      area_id,
      boletin: typeof boletin === 'boolean' ? boletin : false,
      descripcion
    }, {
      where: { id: id }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Empleado no encontrado o no hubo cambios para actualizar." });
    }
    const empleadoActualizado = await Empleado.findByPk(id);
    res.status(200).json({ mensaje: "Empleado actualizado exitosamente.", data: empleadoActualizado });

  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: "El correo electrónico ya está registrado por otro empleado." });
    } else if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error del servidor al actualizar el empleado." });
  }
};

module.exports = {
  crearEmpleado,
  listarEmpleados,
  eliminarEmpleado,
  actualizarEmpleado,
};