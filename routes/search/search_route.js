const searchQuery = require('./routes/searchQuery');

const router = require('express').Router();

router.get('/:query', searchQuery);

module.exports = router;