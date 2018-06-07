const router = require('express').Router();
const collect = require('./routes/collect');

router.get('/collect', collect);

module.exports = router;