// models/Medico.js
const Conexion = require('./bd/Conexion');

class medico {
    constructor(nombres, especialidad, telefono, correo, direccion) {
        this.nombres = nombres;
        this.especialidad = especialidad;
        this.telefono = telefono;
        this.correo = correo;
        this.direccion = direccion;
    }

    static async getAll() {
        const result = await Conexion.query('SELECT * FROM medico ORDER BY idmedico');
        return result.rows;
    }

    static async getById(id) {
        const result = await Conexion.query('SELECT * FROM medico WHERE idmedico = $1', [id]);
        return result.rows[0];
    }

    async save() {
        const query = `
            INSERT INTO medico (nombres, especialidad, telefono, correo, direccion)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING idmedico
        `;
        const values = [this.nombres, this.especialidad, this.telefono, this.correo, this.direccion];
        const result = await Conexion.query(query, values);
        this.id = result.rows[0].id;
        return this;
    }

    static async update(id, datos) {
        const fields = Object.keys(datos);
        const values = Object.values(datos);
        const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
        const query = `UPDATE medico SET ${setClause} WHERE idmedico = $${fields.length + 1}`;
        values.push(id);
        await Conexion.query(query, values);
        return { id, ...datos };
    }

    static async delete(id) {
        const result = await Conexion.query('DELETE FROM medico WHERE idmedico = $1', [id]);
        return result.rowCount > 0;
    }
};

module.exports = medico;