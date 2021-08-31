// Importación de base de datos
const mongoose = require('./database/database_mongo');
const sequelize = require('./database/database_sql');

const morgan = require('morgan');

require('dotenv').config();

// Info gestionada en mongoDB
const cuentaBancariaRouter = require('./routes/cuentaBancaria');

// Info gestionada en MySQL
const bandasRouter = require('./routes/bandas');

// Importaciones adicionales
const express = require('express');
const app = express();

// Settings
app.use(express.json());
app.use(morgan('combined'));


app.use('/cuentasBancarias', cuentaBancariaRouter);
app.use('/bandas', bandasRouter);

app.use('/version', (req, res) => {
    const admin = new mongoose.mongo.Admin(mongoose.connection.db);
    admin.buildInfo(function (err, info) {
        console.log(`Versión interna mongodb: ${info.version}`);
        console.log(`Versión interna mongoose: ${mongoose.version}`);
    });
    res.json('Acámica Rock v1.0');
})

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('Servicio iniciado en puerto ' + process.env.EXPRESS_PORT)
}
)



