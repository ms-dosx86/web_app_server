const Playlist = require('../../../models/playlist').PlaylistModel;
const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
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
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}