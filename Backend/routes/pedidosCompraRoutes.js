const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const pedidosCompraController = require('../controllers/pedidosCompraController');

router.get('/listar', authMiddleware, pedidosCompraController.listar);
router.post('/cadastrar', authMiddleware, pedidosCompraController.cadastrar);
router.put('/editar/:numero_pedido_compra', authMiddleware, pedidosCompraController.editar);
router.delete('/deletar/:id', authMiddleware, pedidosCompraController.deletar);
router.get('/listarProdutos', authMiddleware, pedidosCompraController.listarProdutos);
router.put('/confirmarRecebimento', authMiddleware, pedidosCompraController.confirmarRecebimento);

module.exports = router;