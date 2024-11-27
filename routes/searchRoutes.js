const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Rota para busca
router.get('/', searchController.search);

module.exports = router;
