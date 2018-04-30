const Playlist = require('../../../models/playlist').PlaylistModel;

module.exports = async (req, res) => {
    try {
        let playlists = await Playlist.find({});
        const response = {
            success: true,
            msg: 'список всех плейлистов',
            body: playlists
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