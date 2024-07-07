const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const produtosController = require('../controllers/produtosController');

router.get('/listar', authMiddleware, produtosController.listar);
router.post('/cadastrar', authMiddleware, produtosController.cadastrar);
router.put('/editar/:id', authMiddleware, produtosController.editar);
router.delete('/deletar/:id', authMiddleware, produtosController.deletar);

module.exports = router;