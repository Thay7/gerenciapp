const express = require('express');
const router = express.Router();
const pedidosCompraController = require('../controllers/pedidosCompraController');

router.get('/listar', pedidosCompraController.listar);
router.post('/cadastrar', pedidosCompraController.cadastrar);
router.put('/editar/:numero_pedido_compra', pedidosCompraController.editar);
router.delete('/deletar/:id', pedidosCompraController.deletar);
router.get('/listarProdutos', pedidosCompraController.listarProdutos);
router.put('/confirmarRecebimento/:numero_pedido_compra', pedidosCompraController.confirmarRecebimento);

module.exports = router;