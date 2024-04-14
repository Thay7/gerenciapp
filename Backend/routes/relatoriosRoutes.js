const express = require('express');
const router = express.Router();
const relatoriosController = require('../controllers/relatoriosController');

router.get('/listarAnosDisponiveisVenda', relatoriosController.listarAnosDisponiveisVenda);
router.get('/listarMesesDisponiveisVenda', relatoriosController.listarMesesDisponiveisVenda);
router.post('/listarDadosRelatorioVendasMesAno', relatoriosController.listarDadosRelatorioVendasMesAno);
router.post('/listarDadosRelatorioItensMaisVendidos', relatoriosController.listarDadosRelatorioItensMaisVendidos);

//router.put('/editar/:id', relatoriosController.editar);
//router.delete('/deletar/:id', relatoriosController.deletar);

module.exports = router;