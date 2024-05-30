const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

router.get('/dadosPerfil/:id', perfilController.dadosPerfil);

module.exports = router;