const express = require('express');
const app = express();

const router = express.Router();

// Controllers
const cuentaBancariaController = require('../controllers/cuentaBancaria');

// CuentasBancarias
router.get('/', cuentaBancariaController.cuentaBancariaList);
router.get('/search/', cuentaBancariaController.cuentaBancariaListPorNombre);
router.get('/count', cuentaBancariaController.cuentaBancariaCount)
router.post('/', cuentaBancariaController.cuentaBancariaAdd);
router.delete('/:email', cuentaBancariaController.cuentaBancariaExistePorEmail, cuentaBancariaController.cuentaBancariaDelete);
router.put('/:email', cuentaBancariaController.cuentaBancariaExistePorEmail, cuentaBancariaController.cuentaBancariaUpdate);


// CuentasBancarias - Documentos embebidos
router.post('/:email/puntoContacto', cuentaBancariaController.cuentaBancariaExistePorEmail,
    cuentaBancariaController.cuentaBancariaUpdateAddPuntoContacto);

// CuentasBancarias - Operaciones
router.post('/transferencia', cuentaBancariaController.cuentaBancariaTransferencia);

module.exports = router;


