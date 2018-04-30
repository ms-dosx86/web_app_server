const router = require('express').Router();
const getAll = require('./routes/getAll');
const getList = require('./routes/getList')

router.get('/all', getAll);
router.get('/list/:name', getList);

module.exports = router;