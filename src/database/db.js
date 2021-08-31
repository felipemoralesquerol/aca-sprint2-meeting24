require('dotenv').config();

const { Sequelize } = require('sequelize');
// https://sequelize.org/master/manual/getting-started.html


// const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, process.env.MYSQL_PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql'
// });
const sequelize = new Sequelize('mysql://acamica:Felipe.2021@localhost/aca_s2_m23');

async function authenticate_mysql() {
    try {
        await sequelize.authenticate();
        console.log('Conectado a base de datos MySQL.');
    } catch (error) {
        console.error('Error de conexión a base de datos MySQL:', error);
    }
};

authenticate_mysql();




module.exports = sequelize;