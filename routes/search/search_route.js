const express = require('express');
const searchQuery = require('./routes/searchQuery');

const router = express.Router();

router.get('/:query', searchQuery);

module.exports = router;