const express = require('express');
const router = express.Router();
const fornecedoresController = require('../controllers/fornecedoresController');

router.get('/listar', fornecedoresController.listar);
/*router.post('/cadastrar', fornecedoresController.cadastrar);
router.put('/editar/:id', fornecedoresController.editar);
router.delete('/deletar/:id', fornecedoresController.deletar);*/

module.exports = router;