const paciente = require('../modelo/modeloPaciente');

const pacienteControlador = {
    // GET /pacientes
        async listaPacientes(req, res) {
            try {
                const pacientes = await paciente.obtenerPacientes();
                res.status(200).json(pacientes);
            } catch (error) {
                console.error('Error al mostrar pacientes:', error);
                res.status(500).json({ mensaje: 'Error al obtener los pacientes' });
            }
        },

       // GET /paciente/:id
    async obtenerPorId(req, res) {
        const { id } = req.params;
        try {
            const pacienteEncontrado = await paciente.obtenerPacientesId(id);
            if (!pacienteEncontrado) {
                return res.status(404).json({ mensaje: 'Paciente no encontrado' });
            }
            res.status(200).json(pacienteEncontrado);
        } catch (error) {
            console.error('Error al obtener médico por ID:', error);
            res.status(500).json({ mensaje: 'Error al obtener el paciente' });
        }
    },

    async crear(req, res) {
            const { t1: documento, t2: nombres, t3: telefono, t4: correo, t5: direccion } = req.body;
            if (!documento || !nombres || !telefono || !correo || !direccion) {
                return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
            }
    
            try {
                const nuevoPaciente = new paciente(documento, nombres, telefono, correo, direccion);
                const pacienteGuardado = await nuevoPaciente.guardarPaciente();
                res.status(201).json(pacienteGuardado);
            } catch (error) {
                console.error('Error al crear el Paciente:', error);
                res.status(500).json({ mensaje: 'Error al crear el Paciente' });
            }
        },
    // PUT /medicos/:id
    async actualizar(req, res) {
        const { id } = req.params;
        const { t1: documento, t2: nombres, t3: telefono, t4: correo, t5: direccion } = req.body;
        const datos = new paciente(documento, nombres, telefono, correo, direccion);

        if (Object.keys(datos).length === 0) {
            return res.status(400).json({ mensaje: 'No hay datos para actualizar' });
        }

        try {
            const pacienteExistente = await paciente.obtenerPacientesId(id);
            if (!pacienteExistente) {
                return res.status(404).json({ mensaje: 'Paciente no encontrado' });
            }

            const pacienteActualizado = await paciente.update(id, datos);
            res.status(200).json(pacienteActualizado);
        } catch (error) {
            console.error('Error al actualizar paciente:', error);
            res.status(500).json({ mensaje: 'Error al actualizar el paciente' });
        }
    },

    // DELETE /medicos/:id
    async eliminar(req, res) {
        const { id } = req.params;
        try {
            const eliminado = await paciente.delete(id);
            if (!eliminado) {
                return res.status(404).json({ mensaje: 'Paciente no encontrado' });
            }
            res.status(200).json({ mensaje: 'Paciente eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar paciente:', error);
            res.status(500).json({ mensaje: 'Error al eliminar el paciente' });
        }
    }
};

module.exports = pacienteControlador;