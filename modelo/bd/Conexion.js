// config/Conexion.js
/*const { Client } = require('pg');
const Config = require('./Config');

class Conexion {
    constructor() {
        this.client = new Client({
            host: Config.DB_HOST,
            user: Config.DB_USER,
            password: Config.DB_PASSWORD,
            database: Config.DB_NAME,
            port: Config.DB_PORT,
        });
    }

    async conectar() {
        try {
            await this.client.connect();
            console.log('✅ Conexión exitosa a PostgreSQL');
        } catch (error) {
            console.error('❌ Error al conectar a PostgreSQL:', error.message);
            process.exit(1);
        }
    }

    getClient() {
        return this.client;
    }
}

module.exports = Conexion;*/

/*// config/Conexion.js
const { Pool } = require('pg');
const Config = require('./Config');

const pool = new Pool({
    host: Config.DB_HOST,
    user: Config.DB_USER,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    port: Config.DB_PORT,
});

pool.on('connect', () => {
    console.log('✅ Conexión exitosa a PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error en la conexión a PostgreSQL:', err.message);
});

module.exports = pool;*/

const { Pool } = require('pg');
const Config = require('./Config');

const pool = new Pool({
    host: Config.DB_HOST,
    user: Config.DB_USER,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    port: Config.DB_PORT,
    max: 10,               // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // Tiempo de espera para liberar una conexión
    connectionTimeoutMillis: 2000 // Tiempo máximo de espera para conectar
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};