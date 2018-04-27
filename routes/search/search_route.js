const searchQuery = require('./routes/searchQuery');
const getVideo = require('./routes/getVideo');

const router = require('express').Router();

router.get('/list/:query/:token?', searchQuery);
router.get('/video/:id', getVideo);

module.exports = router;