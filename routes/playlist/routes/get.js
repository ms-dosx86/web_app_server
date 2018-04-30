const Playlist = require('../../../models/playlist').PlaylistModel;

module.exports = async (req, res) => {
    try {
        let playlist = await Playlist.findById(req.params.id);
        playlist.viewCount++;
        await playlist.save();
        const response = {
            success: true,
            msg: 'плейлист найден',
            body: playlist
        }
        res.send(response);
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}