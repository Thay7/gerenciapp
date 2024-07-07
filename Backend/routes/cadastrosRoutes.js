const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cadastrosController = require('../controllers/cadastrosController');

router.get('/listarCadastros', authMiddleware, cadastrosController.listarCadastros);
router.put('/editarUsuario/:id', authMiddleware, cadastrosController.editarUsuario);
router.put('/editarFornecedor/:id', authMiddleware, cadastrosController.editarFornecedor);
router.put('/editarMovCaixa/:id', authMiddleware, cadastrosController.editarMovCaixa);
router.post('/cadastrarUsuario', authMiddleware, cadastrosController.cadastrarUsuario);
router.post('/cadastrarFornecedor', authMiddleware, cadastrosController.cadastrarFornecedor);
router.post('/cadastrarMovimentoCaixa', authMiddleware, cadastrosController.cadastrarMovimentoCaixa);
router.delete('/deletarUsuario/:id', authMiddleware, cadastrosController.deletarUsuario);
router.delete('/deletarFornecedor/:id', authMiddleware, cadastrosController.deletarFornecedor);
router.delete('/deletarMovCaixa/:id', authMiddleware, cadastrosController.deletarMovCaixa);

module.exports = router;