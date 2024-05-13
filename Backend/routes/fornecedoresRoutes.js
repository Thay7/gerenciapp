const express = require('express');
const router = express.Router();
const fornecedoresController = require('../controllers/fornecedoresController');

router.get('/listar', fornecedoresController.listar);

module.exports = router;