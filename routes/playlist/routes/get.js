const Playlist = require('../../../models/playlist').PlaylistModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING PLAYLIST-------------------------');
        let playlist = await Playlist.findById(req.params.id);
        if (req.params.view === 'true') {
            playlist.viewCount++;
            await playlist.save();
        }
        const response = {
            success: true,
            msg: 'плейлист найден',
            body: playlist
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------GETTING PLAYLIST IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING PLAYLIST: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING PLAYLIST IS CRASHED-------------------------');
    }
}