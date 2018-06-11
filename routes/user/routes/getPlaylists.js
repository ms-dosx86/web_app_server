const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING USERS\' PLAYLISTS-------------------------');
        let user = null;
        if (req.params.way == 'id') {
            user = await User.findById(req.params.identificator);
        } else {
            user = await User.findOne({ login: req.params.identificator });
        }
        if (user === null) throw new Error('нет такого пользователя');
        let page = req.params.page;
        let playlists = [];
        let pages = 0;
        if (user.playlists) {
            let i = user.playlists.length - page*10 - 1;
            pages = (user.playlists.length / 10).toFixed();
            while (playlists.length < 10 && i >= 0) {
                playlists.push(user.playlists[i]);
                i--;
            } 
        }
        const response = {
            success: true,
            msg: 'пользователь найден',
            body: {
                playlists: playlists,
                allPages: pages
            }
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------GETTING USERS\' PLAYLISTS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING USERS\' PLAYLISTS: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING USERS\' PLAYLISTS IS CRASHED-------------------------');
    }
    

}