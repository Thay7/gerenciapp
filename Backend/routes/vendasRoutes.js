const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

router.get('/listar', vendasController.listar);
router.post('/cadastrar', vendasController.cadastrar);
router.put('/editar/:id', vendasController.editar);
router.delete('/deletar/:id', vendasController.deletar);

module.exports = router;