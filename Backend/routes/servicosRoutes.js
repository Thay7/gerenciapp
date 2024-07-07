const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const servicosController = require('../controllers/servicosController');

router.get('/listar', authMiddleware, servicosController.listar);
router.post('/cadastrar', authMiddleware, servicosController.cadastrar);
router.put('/editar/:id', authMiddleware, servicosController.editar);
router.delete('/deletar/:id', authMiddleware, servicosController.deletar);

module.exports = router;