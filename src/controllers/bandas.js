// Conector a la base de datos
const sequelize = require('../database/database_sql');

// Importación de modelos
//const { cuentaBancariaModel, contactoModel } = require('../models/cuentaBancaria');

exports.List = async function (req, res, next) {
    const todos = await sequelize.query('SELECT * FROM bandas', { type: sequelize.QueryTypes.SELECT });
    console.log(todos);
    res.json(todos);
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
        res.status(500).json('Error interno!');
    }
};

exports.Delete = async function (req, res, next) {
    try {
        cadena = `DELETE FROM bandas where id=${req.params.id}`;
        console.log(cadena);
        const resultado = await sequelize.query(cadena, { type: sequelize.QueryTypes.DELETE });
        res.json(resultado);
    }
    catch (err) {
        console.log(err.message);
    }
};



