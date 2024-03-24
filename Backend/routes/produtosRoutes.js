const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/listar', produtosController.listar);
router.post('/cadastrar', produtosController.cadastrar);
router.put('/editar/:id', produtosController.editar);
router.delete('/deletar/:id', produtosController.deletar);

module.exports = router;