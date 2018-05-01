(async () => {
    try {
        //зависимости
        const express = require('express');
        const bodyParser = require('body-parser');
        const cors = require('cors');
        const mongoose = require('mongoose');
        const path = require('path');
        //зависимости 2
        const config = require('./config');
        const user = require('./routes/user/user_route');
        const playlist = require('./routes/playlist/playlist_route');
        const search = require('./routes/search/search_route');
        const tag = require('./routes/tag/tag_route');
        //переменные
        const app = express();
        const port = 3000;
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
        //подключение к бд
        await mongoose.connect(config.database);
        console.log('connected');
        await app.listen(port);
        console.log(port + ' is listened');
    } catch(e) {
        console.log(e);
    }
})();
