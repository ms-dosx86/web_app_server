const express = require('express');
const router = express.Router();
const checkEmail = require('./routes/checkEmail');
const checkLogin = require('./routes/checkLogin');
const registration = require('./routes/registration');
const auth = require('./routes/auth');
const getUser = require('./routes/getUser');
const getSettings = require('./routes/getSettings');

router.post('/reg', registration);
router.post('/auth', auth);
router.get('/checkEmail/:email', checkEmail);
router.get('/checkLogin/:login', checkLogin);
router.get('/getUser/:id', getUser);
router.get('/getSettings/:id');
module.exports = router;