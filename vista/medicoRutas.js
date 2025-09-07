// routes/medicoRoutes.js
const express = require('express');
const router = express.Router();
const medicoControlador = require('../contralador/medicoControlador')

// Rutas disponibles:
// GET     /medicos          -> listar todos los médicos
// GET     /medicos/:id      -> obtener un médico por ID
// POST    /medicos          -> crear un nuevo médico
// PUT     /medicos/:id      -> actualizar un médico
// DELETE  /medicos/:id      -> eliminar un médico

router.get('/', medicoControlador.listar);
router.get('/:id', medicoControlador.obtenerPorId);
router.post('/', medicoControlador.crear);
router.put('/:id', medicoControlador.actualizar);
router.delete('/:id', medicoControlador.eliminar);

module.exports = router;