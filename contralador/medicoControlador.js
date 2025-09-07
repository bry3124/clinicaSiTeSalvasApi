// controllers/MedicoControlador.js
const medico = require('../modelo/medicoModelo.js');

const medicoControlador = {
    // GET /medicos
    async listar(req, res) {
        try {
            const medicos = await medico.getAll();
            res.status(200).json(medicos);
        } catch (error) {
            console.error('Error al listar médicos:', error);
            res.status(500).json({ mensaje: 'Error al obtener los médicos' });
        }
    },

    // GET /medicos/:id
    async obtenerPorId(req, res) {
        const { id } = req.params;
        try {
            const medico = await medico.getById(id);
            if (!medico) {
                return res.status(404).json({ mensaje: 'Médico no encontrado' });
            }
            res.status(200).json(medico);
        } catch (error) {
            console.error('Error al obtener médico por ID:', error);
            res.status(500).json({ mensaje: 'Error al obtener el médico' });
        }
    },

    // POST /medicos
    async crear(req, res) {
        const { t1: nombres, t2: especialidad, t3: telefono, t4: correo, t5: direccion } = req.body;
        if (!nombres || !especialidad || !telefono || !correo || !direccion) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        try {
            const nuevoMedico = new medico(nombres, especialidad, telefono, correo, direccion);
            const medicoGuardado = await nuevoMedico.save();
            res.status(201).json(medicoGuardado);
        } catch (error) {
            console.error('Error al crear médico:', error);
            res.status(500).json({ mensaje: 'Error al crear el médico' });
        }
    },

    // PUT /medicos/:id
    async actualizar(req, res) {
        const { id } = req.params;
        const { t1: nombres, t2: especialidad, t3: telefono, t4: correo, t5: direccion } = req.body;
        const datos = new medico(nombres, especialidad, telefono, correo, direccion);

        if (Object.keys(datos).length === 0) {
            return res.status(400).json({ mensaje: 'No hay datos para actualizar' });
        }

        try {
            const medicoExistente = await medico.getById(id);
            if (!medicoExistente) {
                return res.status(404).json({ mensaje: 'Médico no encontrado' });
            }

            const medicoActualizado = await medico.update(id, datos);
            res.status(200).json(medicoActualizado);
        } catch (error) {
            console.error('Error al actualizar médico:', error);
            res.status(500).json({ mensaje: 'Error al actualizar el médico' });
        }
    },

    // DELETE /medicos/:id
    async eliminar(req, res) {
        const { id } = req.params;
        try {
            const eliminado = await medico.delete(id);
            if (!eliminado) {
                return res.status(404).json({ mensaje: 'Médico no encontrado' });
            }
            res.status(200).json({ mensaje: 'Médico eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar médico:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el médico' });
        }
    }
};

module.exports = medicoControlador;
