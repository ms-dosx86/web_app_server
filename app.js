const logger = require('./functions/logger');
const path_to_logs = require('./config').path_to_logs;
const path_to_err_logs = require('./config').path_to_err_logs;
//зависимости
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const clean_dir = require('./functions/clean_dir');
const fs = require('fs');
//зависимости 2
const config = require('./config');
const user = require('./routes/user/user_route');
const playlist = require('./routes/playlist/playlist_route');
const search = require('./routes/search/search_route');
const tag = require('./routes/tag/tag_route');
const home = require('./routes/home/home_route');
const statistics = require('./routes/statistics/statistic_route');
const create_file_dir = require('./functions/create_file_dir');
//переменные
const app = express();
const port = 3000;
(async () => {
    try {
        //middleware
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('/api/image/default', express.static(path.join(__dirname, '/defaults')))
        app.use('/api/image/playlist', express.static(path.join(__dirname, '/files/images/playlists')))
        app.use('/api/image/avatar', express.static(path.join(__dirname, '/files/images/avatars')))
        app.use('/api/tag', tag);
        app.use('/api/user', user);
        app.use('/api/playlist', playlist);
        app.use('/api/search', search);
        app.use('/api/home', home);
        app.use('/api/statistics', statistics);
        //clean logs
        fs.writeFile('logs/logs.txt', '', err => {
            if (err) throw err;
        });
        //clean err logs
        fs.writeFile('logs/err_logs.txt', '', err => {
            if (err) throw err;
        });
        await create_file_dir();
        //clean temp files
        await clean_dir(__dirname + '/files/temp');
        //connect to db
        await mongoose.connect(config.database);
        logger(path_to_logs, 'connected to database');
        await app.listen(port, '127.0.0.1');
        logger(path_to_logs, 'port ' + port + ' is listened');
        console.log('now server is running');
    } catch(e) {
        logger(path_to_err_logs, e.message);
    }
})();
