// config/Config.js
require('dotenv').config();

class Config {
    static get DB_HOST() {
        return process.env.DB_HOST;
    }
    static get DB_USER() {
        return process.env.DB_USER;
    }
    static get DB_PASSWORD() {
        return process.env.DB_PASSWORD;
    }
    static get DB_NAME() {
        return process.env.DB_NAME;
    }
    static get DB_PORT() {
        return process.env.DB_PORT;
    }
    static get PORT() {
        return process.env.PORT;
    }
}

module.exports = Config;