const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const vendasController = require('../controllers/vendasController');

router.get('/listar', authMiddleware, vendasController.listar);
router.post('/cadastrar', authMiddleware, vendasController.cadastrar);
router.put('/editar/:id', authMiddleware, vendasController.editar);
router.delete('/deletar/:id', authMiddleware, vendasController.deletar);
router.get('/listarItensParaVenda', authMiddleware, vendasController.listarItensParaVenda);

module.exports = router;