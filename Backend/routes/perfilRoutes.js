const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const perfilController = require('../controllers/perfilController');

router.get('/dadosPerfil/:id', authMiddleware, perfilController.dadosPerfil);

module.exports = router;