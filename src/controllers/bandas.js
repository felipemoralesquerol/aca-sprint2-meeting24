// Conector a la base de datos
const sequelize = require('../database/db');

// Importación de modelos
//const { cuentaBancariaModel, contactoModel } = require('../models/cuentaBancaria');

exports.Exist = async function (req, res, next) {
    try {
        // // Evita SQL injection
        // if (isNaN(parseInt(req.params.id))) {
        //     throw new Error('Error de peticion (Se espera un valor entero))');
        // }

        cadena = `SELECT * FROM bandas WHERE id = ${req.params.id};`
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
        if (req.query.pais) {
            buscar += ` pais like '%${req.query.pais}%' AND `;
        };
        if (req.query.nombre) {
            buscar += `nombre like '%${req.query.nombre}%' AND `
        };
        if (req.query.integrantes) {
            buscar += `integrantes = ${req.query.integrantes} AND `
        };
        // Recorte AND final
        buscar = buscar.substr(0, buscar.length - 5);
        buscar = buscar.length > 0 ? ` WHERE ${buscar}` : '';
        console.log('Actualizado: ', buscar);
        cadena = `SELECT * FROM bandas ${buscar}`;
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
        const todos = await sequelize.query('SELECT * FROM bandas', { type: sequelize.QueryTypes.SELECT });
        console.log(todos);
        res.json(todos);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    }
};

exports.Count = async function (req, res, next) {
    const todos = await sequelize.query('SELECT count(*) cant FROM bandas', { type: sequelize.QueryTypes.SELECT });
    console.log(todos);
    res.json(todos);
};

exports.Add = async function (req, res, next) {
    try {
        cadena = `INSERT INTO bandas(nombre, integrantes, fecha_inicio, fecha_separación, pais)
              VALUES('${req.body.nombre}',${req.body.integrantes}, '${req.body.fecha_inicio}',NULL,'${req.body.pais}')`;
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
        cadena = `UPDATE bandas SET nombre='${req.body.nombre}',
                      integrantes=${req.body.integrantes}, 
                      fecha_inicio='${req.body.fecha_inicio}',
                      fecha_separación='${req.body.fecha_separación}',
                      pais='${req.body.pais}'
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
        cadena = `DELETE FROM bandas WHERE id=${req.params.id}`;
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



