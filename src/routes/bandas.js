const express = require('express');
const app = express();

const router = express.Router();

// Controllers
const bandasController = require('../controllers/bandas');

// CuentasBancarias
router.get('/', bandasController.List);
// router.get('/search/', bandasController.cuentaBancariaListPorNombre);
router.get('/count', bandasController.Count)
router.post('/', bandasController.Add);
// router.delete('/:email', bandasController.cuentaBancariaExistePorEmail, cuentaBancariaController.cuentaBancariaDelete);
// router.put('/:email', bandasController.cuentaBancariaExistePorEmail, cuentaBancariaController.cuentaBancariaUpdate);


module.exports = router;


