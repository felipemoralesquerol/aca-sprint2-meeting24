require('dotenv').config();

const { Sequelize } = require('sequelize');
// https://sequelize.org/master/manual/getting-started.html

// TODO: Externalizar las options
const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
    logging: console.log,
    logging: (...msg) => console.log(msg)

});

async function authenticate_mysql() {
    try {
        await sequelize.authenticate();
        console.log('Conectado a base de datos MySQL.');
    } catch (error) {
        console.error('Error en conexión a base de datos MySQL:', error);
    }
};

authenticate_mysql();




module.exports = sequelize;