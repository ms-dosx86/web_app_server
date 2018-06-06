const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING USERS\' FAVS-------------------------');
        let user = await User.findById(req.params.id);
        if (user === null) throw new Error('нет такого пользователя');
        let page = req.params.page;
        let playlists = [];
        let pages = 0;
        if (user.favs) {
            let i = user.favs.length - page*10 - 1;
            pages = (user.favs.length / 10).toFixed();
            while (playlists.length < 10 && i > 0) {
                playlists.push(user.favs[i]);
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
        logger(path_to_logs, '-----------------------------GETTING USERS\' FAVS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING USERS\' FAVS: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING USERS\' FAVS IS CRASHED-------------------------');
    }
    

}