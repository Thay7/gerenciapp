const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

//Vendas

router.get('/listarAnosDisponiveisVenda', relatoriosController.listarAnosDisponiveisVenda);
router.get('/listarMesesDisponiveisVenda', relatoriosController.listarMesesDisponiveisVenda);
router.post('/listarDadosRelatorioVendasMesAno', relatoriosController.listarDadosRelatorioVendasMesAno);
router.post('/listarDadosRelatorioItensMaisVendidos', relatoriosController.listarDadosRelatorioItensMaisVendidos);

//Pedidos compra
router.get('/listarAnosDisponiveisPedidosCompra', relatoriosController.listarAnosDisponiveisPedidosCompra);
router.get('/listarMesesDisponiveisPedidosCompra', relatoriosController.listarMesesDisponiveisPedidosCompra);
router.post('/listarDadosRelatorioHistoricoPedidosCompra', relatoriosController.listarDadosRelatorioHistoricoPedidosCompra);
router.post('/listarDadosRelatorioComprasFornecedor', relatoriosController.listarDadosRelatorioComprasFornecedor);

module.exports = router;