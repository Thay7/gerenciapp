const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const homeController = require('../controllers/homeController');

router.get('/listarResumoDia', authMiddleware, homeController.listarResumoDia);

module.exports = router;