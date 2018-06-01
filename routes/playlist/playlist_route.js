const express = require('express');
const router = express.Router();
const create = require('./routes/create');
const get = require('./routes/get');
const deletePlaylist = require('./routes/delete');
const getAll = require('./routes/getAll');
const search = require('./routes/search');
const update = require('./routes/update');

router.post('/create', create);
router.get('/id/:id/:view?', get);
router.get('/delete/:userid/:playid', deletePlaylist);
router.get('/list/getAll', getAll);
router.post('/search/:page', search);
router.post('/update', update);

module.exports = router;