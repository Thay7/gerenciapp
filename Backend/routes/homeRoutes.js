const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/listarResumoDia', homeController.listarResumoDia);

module.exports = router;