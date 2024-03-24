const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.get('/listarProdutos', estoqueController.listarProdutos);
router.get('/listar', estoqueController.listar);
router.post('/cadastrar', estoqueController.cadastrar);
router.put('/editar/:id', estoqueController.editar);
// router.delete('/deletar/:id', estoqueController.deletar);

module.exports = router;