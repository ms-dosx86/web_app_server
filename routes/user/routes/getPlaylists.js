const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;

module.exports = async (req, res) => {
    try {
        console.log(req.params);
        let user = await User.findById(req.params.id);
        if (user === null) throw new Error('нет такого пользователя');
        const response = {
            success: true,
            msg: 'пользователь найден',
            body: user.playlists
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