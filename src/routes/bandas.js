const express = require('express');
const app = express();

const router = express.Router();

// Controllers
const bandasController = require('../controllers/bandas');

// CuentasBancarias
router.get('/', bandasController.List);
router.get('/count', bandasController.Count)
router.get('/:id', bandasController.Exist, (req, res) => { res.json(req.banda) });
// router.get('/search/', bandasController.cuentaBancariaListPorNombre);

router.post('/', bandasController.Add);
router.delete('/:id', bandasController.Exist, bandasController.Delete);
router.put('/:id', /*bandasController.Exist,*/ bandasController.Update);


module.exports = router;


