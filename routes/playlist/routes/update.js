const Playlist = require('../../../models/playlist').PlaylistModel;
const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        console.log(req.body);
        let user = await User.findById(req.body.userid);
        if (user === null) throw new Error('пользователь не найден');
        let playlist = await Playlist.findById(req.body.playlist._id);
        if (playlist === null) throw new Error('плейлист не найден');
        for (let i = 0; i < user.playlists.length; i++) {
            if (user.playlists[i]._id == req.body.playlist._id) {
                user.playlists[i] = req.body.playlist;
                await user.save();
                break;
            }
        }
        await Playlist.findByIdAndUpdate(req.body.playlist._id, req.body.playlist);
        const response = {
            success: true,
            msg: 'плейлист обновлен'
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