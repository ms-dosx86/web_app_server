const searchQuery = require('./routes/searchQuery');

const router = require('express').Router();

router.get('/:query/:token?', searchQuery);

module.exports = router;