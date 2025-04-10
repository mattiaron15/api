const express = require('express');
const router = express.Router();

// Importa le rotte
const authRoutes = require('./auth');

// Definisci i prefissi delle rotte
router.use('/api/auth', authRoutes);

module.exports = router;