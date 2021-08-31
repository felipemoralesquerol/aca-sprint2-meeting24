const { Schema, model } = require('mongoose');

// Esquema de puntos de contacto
const ContactoSchema = new Schema({
    telefono: String,
    website: String,
    direccion: String,
    twitter: String
});

// Esquema de cuentas bancarias
const CuentaBancariaSchema = new Schema({
    nombre: {
        type: String, required: true
    },
    apellido: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    saldoInicial: {
        type: Number, required: true
    },
    saldoActual: {
        type: Number, required: true
    },
    puntoContacto: ContactoSchema
});



const cuentaBancariaModel = model("cuentaBancaria", CuentaBancariaSchema);
const contactoModel = model("contacto", ContactoSchema);

module.exports = { cuentaBancariaModel, contactoModel };