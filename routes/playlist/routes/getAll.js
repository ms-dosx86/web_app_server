const Playlist = require('../../../models/playlist').PlaylistModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING ALL PLAYLISTS-------------------------');
        let playlists = await Playlist.find({});
        const response = {
            success: true,
            msg: 'список всех плейлистов',
            body: playlists
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------GETTING ALL PLAYLISTS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING ALL PLAYLISTS: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING ALL PLAYLISTS IS CRASHED-------------------------');
    }
}