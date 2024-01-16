const express = require('express');
const router = express.Router();
const pedidosCompraController = require('../controllers/pedidosCompraController');

router.get('/listar', pedidosCompraController.listar);
router.post('/cadastrar', pedidosCompraController.cadastrar);
router.put('/editar/:id', pedidosCompraController.editar);
router.delete('/deletar/:id', pedidosCompraController.deletar);
router.get('/listarProdutos', pedidosCompraController.listarProdutos);
router.put('/confirmarRetorno/:numero_pedido_compra', pedidosCompraController.confirmarRetorno);

module.exports = router;