const express = require('express');
const router = express.Router();
const rutapaciente = require('../contralador/pacienteControlador');

router.get('/', rutapaciente.listaPacientes);
router.get('/:id', rutapaciente.obtenerPorId);
router.post('/', rutapaciente.crear);
router.put('/:id', rutapaciente.actualizar);
router.delete('/:id', rutapaciente.eliminar);


module.exports = router;