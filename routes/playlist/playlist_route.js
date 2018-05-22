const express = require('express');
const router = express.Router();
const create = require('./routes/create');
const get = require('./routes/get');
const changeTitle = require('./routes/changeTitle');
const deletePlaylist = require('./routes/delete');
const getAll = require('./routes/getAll');
const search = require('./routes/search');
const changeDesc = require('./routes/changeDesc');

router.post('/create', create);
router.get('/id/:id/:view?', get);
router.post('/changeTitle', changeTitle);
router.get('/delete/:userid/:playid', deletePlaylist);
router.get('/list/getAll', getAll);
router.post('/search/:page', search);
router.post('/changeDesc', changeDesc);

module.exports = router;