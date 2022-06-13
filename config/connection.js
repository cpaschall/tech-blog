const sequelize = require('sequelize');
require('dotenv').config()

let sequelize;

// JawsDB is an add-on for providing a fully functional MySQL Database server for use with your Heroku application.
if (process.env.JAWSDB_URL) {
    sequelize = new sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3001
        }
    );
}

module.exports = sequelize;