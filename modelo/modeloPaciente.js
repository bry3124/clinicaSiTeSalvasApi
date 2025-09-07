const Conexion = require('./bd/Conexion');
const conexion = require('./bd/Conexion');

class paciente {
    constructor(documento, nombres, telefono, correo, direccion) {
        this.documento = documento;
        this.nombres = nombres;
        this.telefono = telefono;
        this.correo = correo;
        this.direccion = direccion;
    }

    static async obtenerPacientes (){
        try{
            const result = await conexion.query('SELECT * FROM paciente ORDER BY idpaciente');
            return result.rows;
        }catch{
            console.error('Error al obtener pacientes', error);
            throw error
        }
    }

    static async obtenerPacientesId(id) {
        try {
            const result = await conexion.query(
                'SELECT * FROM public.paciente WHERE documento LIKE $1',
                [`%${id}%`] 
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al mostrar el paciente:', error);
            throw error;
        }
    }

   async guardarPaciente() {
            const query = `
                INSERT INTO public.paciente (documento, nombres, telefono, correo, direccion)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING idpaciente
            `;
            const values = [this.documento, this.nombres, this.telefono, this.correo, this.direccion];
            try {
                const result = await conexion.query(query, values);
                this.idpaciente = result.rows[0].idpaciente;
                return this;
            } catch (error) {
                console.error('Error en guardar paciente:', error);
                throw error;
            }
        }
    static async update(id, datos) {
        const fields = Object.keys(datos);
        const values = Object.values(datos);
        const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
        const query = `UPDATE public.paciente SET ${setClause} WHERE idpaciente = $${fields.length + 1}`;
        values.push(id);
        await Conexion.query(query, values);
        return { id, ...datos };
    }

    static async delete(id) {
        const result = await Conexion.query('DELETE FROM public.paciente WHERE idpaciente = $1', [id]);
        return result.rowCount > 0;        
    }
};

module.exports = paciente;