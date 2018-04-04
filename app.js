//зависимости
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const formidable = require('formidable');
//зависимости 2
const config = require('./config');
const user = require('./routes/user/user_route');
const playlist = require('./routes/playlist/playlist_route');
//переменные
const app = express();
const port = 3000;
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/user', user);
app.use('/playlist', playlist);
//подключение к бд
mongoose.connect(config.database).then(() => console.log('connected'), (e) => console.log(e));
//запуск
app.listen(port, () => console.log(port + ' is listened'));
