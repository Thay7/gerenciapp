const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.get('/listar', produtosController.listar);

module.exports = router;