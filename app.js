const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const registration = require('./routes/registration');
const createPlaylist = require('./routes/createPlaylist');
const auth = require('./routes/auth');
const config = require('./config');
const checkEmail = require('./routes/checkEmail');
const checkLogin = require('./routes/checkLogin');

const app = express();
const port = 3000;

app.use(cors(), (req, res, next) => {
    next();
});
app.use(bodyParser.json(), (req, res, next) => {
    next();
});

mongoose.connect(config.database).then(() => console.log('connected'), (e) => console.log(e));

app.post('/user/reg', registration);
app.post('/user/auth', auth);
app.get('/user/checkEmail/:email', checkEmail);
app.get('/user/checkLogin/:login', checkLogin);

app.post('/playlist/create', createPlaylist);

app.listen(port, () => console.log(port + ' is listened'));