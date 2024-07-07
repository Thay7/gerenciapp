const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const relatoriosController = require('../controllers/relatoriosController');

//Vendas

router.get('/listarAnosDisponiveisVenda', authMiddleware, relatoriosController.listarAnosDisponiveisVenda);
router.get('/listarMesesDisponiveisVenda', authMiddleware, relatoriosController.listarMesesDisponiveisVenda);
router.post('/listarDadosRelatorioVendasMesAno', authMiddleware, relatoriosController.listarDadosRelatorioVendasMesAno);
router.post('/listarDadosRelatorioItensMaisVendidos', authMiddleware, relatoriosController.listarDadosRelatorioItensMaisVendidos);

//Pedidos compra
router.get('/listarAnosDisponiveisPedidosCompra', authMiddleware, relatoriosController.listarAnosDisponiveisPedidosCompra);
router.get('/listarMesesDisponiveisPedidosCompra', authMiddleware, relatoriosController.listarMesesDisponiveisPedidosCompra);
router.post('/listarDadosRelatorioHistoricoPedidosCompra', authMiddleware, relatoriosController.listarDadosRelatorioHistoricoPedidosCompra);
router.post('/listarDadosRelatorioComprasFornecedor', authMiddleware, relatoriosController.listarDadosRelatorioComprasFornecedor);

//Consolidado
router.post('/listarDadosRelatorioConsolidado', authMiddleware, relatoriosController.listarDadosRelatorioConsolidado);

module.exports = router;