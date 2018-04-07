const express = require('express');
const router = express.Router();
const create = require('./routes/create');
const get = require('./routes/get');
const update = require('./routes/update');
const deletePlaylist = require('./routes/delete');

router.post('/create', create);
router.get('/get/:id', get);
router.post('/update', update);
router.get('/delete/:userid/:playid', deletePlaylist);


module.exports = router;