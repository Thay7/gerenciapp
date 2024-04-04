const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.get('/listarProdutosSemEstoque', estoqueController.listarProdutosSemEstoque);
router.get('/listarProdutosEmEstoque', estoqueController.listarProdutosEmEstoque);
router.post('/verificaQuantidadeItem', estoqueController.verificaQuantidadeItem);
router.get('/listar', estoqueController.listar);
router.post('/cadastrar', estoqueController.cadastrar);
router.put('/editar/:id', estoqueController.editar);

module.exports = router;