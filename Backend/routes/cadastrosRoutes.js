const express = require('express');
const router = express.Router();
const cadastrosController = require('../controllers/cadastrosController');

router.get('/listarCadastros', cadastrosController.listarCadastros);
router.put('/editarUsuario/:id', cadastrosController.editarUsuario);
router.put('/editarFornecedor/:id', cadastrosController.editarFornecedor);
router.put('/editarMovCaixa/:id', cadastrosController.editarMovCaixa);
router.post('/cadastrarUsuario', cadastrosController.cadastrarUsuario);
router.post('/cadastrarFornecedor', cadastrosController.cadastrarFornecedor);
router.post('/cadastrarMovimentoCaixa', cadastrosController.cadastrarMovimentoCaixa);
router.delete('/deletarUsuario/:id', cadastrosController.deletarUsuario);
router.delete('/deletarFornecedor/:id', cadastrosController.deletarFornecedor);
router.delete('/deletarMovCaixa/:id', cadastrosController.deletarMovCaixa);

module.exports = router;