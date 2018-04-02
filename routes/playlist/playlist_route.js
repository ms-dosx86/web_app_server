const express = require('express');
const router = express.Router();
const createPlaylist = require('./routes/createPlaylist');

router.post('/create', createPlaylist);

module.exports = router;