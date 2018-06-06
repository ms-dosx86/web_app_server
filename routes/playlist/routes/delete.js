const Playlist = require('../../../models/playlist').PlaylistModel;
const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------DELETING PLAYLIST-------------------------');
        let user = await User.findById(req.params.userid);
        if (user === null) throw new Error('пользователь не найден');
        let playlist = await Playlist.findById(req.params.playid);
        if (playlist === null) throw new Error('плейлист не найден');
        for (let i = 0; i < user.playlists.length; i++) {
            if (user.playlists[i]._id == req.params.playid) {
                user.playlists.splice(i, 1);
                await user.save();
                break;
            }
        }
        await playlist.remove();
        const response = {
            success: true,
            msg: 'плейлист был удалён'
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------DELETING PLAYLIST IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH DELETING PLAYLIST: ' + e.message);
        logger(path_to_logs, '-----------------------------DELETING PLAYLIST IS CRASHED-------------------------');
    }
}