const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const fornecedoresController = require('../controllers/fornecedoresController');

router.get('/listar', authMiddleware, fornecedoresController.listar);

module.exports = router;