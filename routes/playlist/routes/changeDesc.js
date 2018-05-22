const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;

module.exports = async (req, res) => {
    try {
        let playlist = await Playlist.findById(req.body.playlist.id);
        let user = await User.findById(req.body.user.id);
        if (playlist === null || user === null) {
            const response = {
                success: false,
                msg: 'no such playlist or user'
            }
            res.send(response);
        } else {
            for (let i = 0; i < user.playlists.length; i++) {
                if (user.playlists[i]._id == playlist._id) {
                    user.playlists[i].description = req.body.playlist.desc;
                    await user.save();
                    break;
                }
            }
            playlist.description = req.body.playlist.desc;
            await playlist.save();
            const response = {
                success: true,
                msg: 'playlist description was updated'
            }
            res.send(response);
        }
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}