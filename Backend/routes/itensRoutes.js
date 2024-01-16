const express = require('express');
const router = express.Router();
const itensController = require('../controllers/itensController');

router.get('/listar', itensController.listar);
router.post('/cadastrar', itensController.cadastrar);
router.put('/editar/:id', itensController.editar);
router.delete('/deletar/:id', itensController.deletar);

module.exports = router;