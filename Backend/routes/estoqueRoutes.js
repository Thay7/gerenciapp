const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const estoqueController = require('../controllers/estoqueController');

router.get('/listarProdutosSemEstoque', authMiddleware, estoqueController.listarProdutosSemEstoque);
router.post('/verificaQuantidadeItem', authMiddleware, estoqueController.verificaQuantidadeItem);
router.get('/listar', authMiddleware, estoqueController.listar);
router.post('/cadastrar', authMiddleware, estoqueController.cadastrar);
router.put('/editar/:id', authMiddleware, estoqueController.editar);

module.exports = router;