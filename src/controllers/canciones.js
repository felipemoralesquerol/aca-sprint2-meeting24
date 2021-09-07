// Conector a la base de datos
const sequelize = require('../database/db');
const tableName = 'canciones';

// Importación de modelos
//const { cuentaBancariaModel, contactoModel } = require('../models/cuentaBancaria');

exports.Exist = async function (req, res, next) {
    try {
        // Evita SQL injection
        if (isNaN(parseInt(req.params.id))) {
            throw new Error('Error de peticion (Se espera un valor entero))');
        }

        cadena = `SELECT * FROM ${tableName} WHERE id = ${req.params.id};`
        const respuesta = await sequelize.query(cadena, { type: sequelize.QueryTypes.SELECT });
        console.log(respuesta);
        if (respuesta.length > 0) {
            req.banda = respuesta;
            next();
        } else {
            res.status(404).json({ status: 'No encontrado' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 'Error interno' })
    }

};


exports.Search = async function (req, res, next) {
    try {
        buscar = ""
        if (req.query.duracion) {
            buscar += ` duracion like '%${req.query.duracion}%' AND `;
        };
        if (req.query.nombre) {
            buscar += `nombre like '%${req.query.nombre}%' AND `
        };
        if (req.query.banda_id) {
            buscar += `banda_id = ${req.query.banda_id} AND `
        };
        if (req.query.album_id) {
            buscar += `album_id = ${req.query.album_id} AND `
        };
        // Recorte AND final
        buscar = buscar.substr(0, buscar.length - 5);
        buscar = buscar.length > 0 ? ` WHERE ${buscar}` : '';
        console.log('Actualizado: ', buscar);
        cadena = `SELECT * FROM ${tableName} ${buscar}`;
        const respuesta = await sequelize.query(cadena, { type: sequelize.QueryTypes.SELECT });
        //console.log(respuesta);
        if (respuesta.length > 0) {
            res.json(respuesta);
        } else {
            res.status(404).json({ status: 'No encontrado' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 'Error interno' })
    }

};

exports.List = async function (req, res, next) {
    try {
        const todos = await sequelize.query(`SELECT * FROM ${tableName}`, { type: sequelize.QueryTypes.SELECT });
        console.log(todos);
        res.json(todos);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    }
};

exports.Count = async function (req, res, next) {
    const todos = await sequelize.query(`SELECT count(*) cant FROM ${tableName}`, { type: sequelize.QueryTypes.SELECT });
    console.log(todos);
    res.json(todos);
};

exports.Add = async function (req, res, next) {
    try {
        cadena = `INSERT INTO ${tableName}(nombre, duracion, banda_id, album_id, fecha_publicacion)
                  VALUES('${req.body.nombre}','${req.body.duracion}','${req.body.banda_id}','${req.body.album_id}', '${req.body.fecha_publicacion}')`;
        console.log(req.body, cadena);
        const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.INSERT });
        res.json(resultado);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};


exports.Update = async function (req, res, next) {
    try {
        cadena = `UPDATE ${tableName} SET nombre='${req.body.nombre}',
                         banda_id=${req.body.banda_id}, 
                         fecha_publicacion='${req.body.fecha_publicacion}'
                  WHERE id=${req.params.id}`;
        console.log(req.body, cadena);
        const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.UPDATE });
        res.json(resultado);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
}
exports.Delete = async function (req, res, next) {
    try {
        cadena = `DELETE FROM ${tableName} WHERE id=${req.params.id}`;
        console.log(cadena);
        const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.DELETE });
        console.log(req.banda)
        res.json(req.banda);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno' });
    }
};



