// Conector a la base de datos
const mongoose = require("mongoose");

// Importación de modelos
const { cuentaBancariaModel, contactoModel } = require('../models/cuentaBancaria');

exports.cuentaBancariaList = async function (req, res, next) {
    const todos = await cuentaBancariaModel.find();
    console.log(todos);
    res.json(todos);
};


exports.cuentaBancariaExistePorEmail = async function (req, res, next) {
    console.log(req.body);

    //Busqueda estricta (por coincidencia total)
    const filtrado = await cuentaBancariaModel.find({ email: req.params.email });
    console.log(filtrado);
    if (filtrado.length == 0) {
        return res.status(404).json({ mensaje: 'Cuenta Bancaria inexistente' })
    } else {
        console.log('Cuenta Bancaria encontrado por email: ' + req.params.email);
        next();
    }

};

exports.cuentaBancariaListPorNombre = async function (req, res, next) {
    console.log(req.query);

    //Busqueda estricta (por coincidencia total)
    //const filtrado = await cuentaBancaria.find(req.query);

    //Busqueda con inclusión (en cualquier parte del nombre) Fuente: https://masteringjs.io/tutorials/mongoose/find-like
    const filtrado = await cuentaBancariaModel.find({ nombre: { $regex: req.query.nombre } });

    console.log(filtrado);
    res.json(filtrado);
};




exports.cuentaBancariaCount = async function (req, res, next) {
    // TODO: Tomar datos del body
    //const filtro = {};
    const count = await cuentaBancariaModel.find().countDocuments();
    console.log(count);
    res.json({ cantidad: count });
};

exports.cuentaBancariaAdd = async function (req, res, next) {
    console.log(req.body);
    let dato = new cuentaBancariaModel(req.body);
    await dato.save(); //es una promesa
    res.json(dato);
};


exports.cuentaBancariaDelete = async function (req, res, next) {
    //TODO: Controlar cuando se intenta borrar con un id "alterado"
    try {
        const cant = await cuentaBancariaModel.deleteOne({ email: req.params.email }, (err, result) => {
            if (err) {
                return res.send(console.log(err.message));
            } else {
                if (result.deletedCount > 0) {
                    return res.json('OK: Se eliminaron ' + result.deletedCount + ' documentos');
                } else {
                    return res.status(404).json('Documento no encontrado');
                }
            }
        }
        );
    }
    catch (err) {
        console.log(err.message);
    }
};

exports.cuentaBancariaUpdate = async function (req, res, next) {
    //TODO: Controlar cuando se intenta borrar con un id "alterado"
    try {
        if (req.params.email !== req.body.email) {
            return res.status(404).json('Actualización descartada por incompatibilidad de código');
        };
        const cant = await cuentaBancariaModel.updateOne({ email: req.params.email }, req.body, (err, result) => {
            console.log('nuevo')
            console.log(err)
            if (err) {
                return res.send(console.log(err.message));
            } else {
                console.log(result)
                return res.json('OK: Se actualizaron ' + result.nModified + ' documentos');
            };
        }
        );
    }
    catch (err) {
        console.log(err.message);
    }
};

exports.cuentaBancariaUpdateAddPuntoContacto = async function (req, res, next) {
    //TODO: Controlar cuando se intenta borrar con un id "alterado"
    //db.cuentabancarias.update({email:"felipe.morales.querol@gmail.com"},{$set: {puntoContado:[]}})
    //db.cuentabancarias.update({email:"felipe.morales.querol@gmail.com"},{$push: {puntoContado:twitter}})

    try {
        console.log(req.params.email);
        const cant = await cuentaBancariaModel.findOneAndUpdate({ email: req.params.email }, { puntoContacto: req.body }
            , (err, result) => {
                console.log(err)
                if (err) {
                    return res.send(console.log(err.message));
                } else {
                    console.log(result)
                    return res.json('OK: Se actualizaron documentos embebidos');
                };
            }
        );
        //console.log(cant);
        //return res.json(cant)
    }
    catch (err) {
        console.log(err.message);
    }
};

exports.cuentaBancariaTransferencia = async function (req, res, next) {
    // Operaciones a nivel de conexión y de sesión sobre la base de datos
    const conn = mongoose.connection;
    const session = await conn.startSession();
    session.startTransaction();
    console.log('Conexión e Inicio de sesión');

    try {
        // Nota: Se asumen ambos emails validados previamente y distintos
        console.log(req.body);
        const origen = req.body.emailOrigen;
        const destino = req.body.emailDestino;
        const monto = Number(req.body.monto);

        const cuentaOrigen = await cuentaBancariaModel.findOne({ email: origen });
        const cuentaDestino = await cuentaBancariaModel.findOne({ email: destino });
        // Excepcion en caso de cuenta no encontrada
        if (!cuentaOrigen || !cuentaDestino) {
            throw new Error('Cuenta/s bancaria/s no encontrada/s')
        }
        console.log(cuentaOrigen.saldoActual);
        console.log(cuentaDestino.saldoActual);

        if (cuentaOrigen.saldoActual >= monto) {
            cuentaOrigen.saldoActual = Number(cuentaOrigen.saldoActual) - monto;
            cuentaDestino.saldoActual = Number(cuentaDestino.saldoActual) + monto;

            // Salvado a nivel de base de datos
            cuentaOrigen.save();
            cuentaDestino.save();

            // Confirmación de transacción
            await session.commitTransaction();
            res.status(201).json(`Transacción realizada correctamente!' Saldo Origen: ${cuentaOrigen.saldoActual} - Saldo Destino: ${cuentaDestino.saldoActual}`)
        } else {
            res.status(400).json('Saldo insuficiente en cuenta origen')
        };
    }
    catch (err) {
        console.log(err.message);
        session.abortTransaction();
        //TODO: Producction
        //res.status(500).json("Error interno")

        //TODO: Development
        res.status(500).json(err.message);

    }
    finally {
        // Cierre de sesion
        session.endSession();
        console.log('Cierre de sesión');
    }

};