const express = require('express');
const router = express.Router();
const { crearEmpleado, listarEmpleados, eliminarEmpleado, actualizarEmpleado } = require('../controllers/empleadoController');

router.post('/', crearEmpleado);
router.get('/', listarEmpleados);
router.delete('/:id', eliminarEmpleado);
router.put('/:id', actualizarEmpleado);

module.exports = router;
