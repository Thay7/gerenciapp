const express = require('express');
const router = express.Router();
const servicosController = require('../controllers/servicosController');

router.get('/listar', servicosController.listar);
router.post('/cadastrar', servicosController.cadastrar);
router.put('/editar/:id', servicosController.editar);
router.delete('/deletar/:id', servicosController.deletar);

module.exports = router;