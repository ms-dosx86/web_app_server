const express = require('express');
const router = express.Router();
const create = require('./routes/create');
const get = require('./routes/get');
const update = require('./routes/update');
const deletePlaylist = require('./routes/delete');
const getAll = require('./routes/getAll');
const search = require('./routes/search');

router.post('/create', create);
router.get('/id/:id', get);
router.post('/update', update);
router.get('/delete/:userid/:playid', deletePlaylist);
router.get('/list/getAll', getAll);
router.post('/search', search);

module.exports = router;