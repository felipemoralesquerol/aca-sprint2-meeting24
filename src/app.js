// Importación de base de datos
// const mongoose = require('./database/mongo');
const sequelize = require('./database/db');

const morgan = require('morgan');

require('dotenv').config();

// Info gestionada en MySQL
const bandasRouter = require('./routes/bandas');
const albumesRouter = require('./routes/albumes');
const cancionesRouter = require('./routes/canciones')


// Importaciones adicionales
const cors = require('cors');
const express = require('express');
const app = express();

// Settings
app.use(express.json());
app.use(morgan('combined'));
// Gestión de cors
app.use(cors());
app.options('*', cors());

app.use('/bandas', bandasRouter);
app.use('/albumes', albumesRouter);
app.use('/canciones', cancionesRouter);

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



