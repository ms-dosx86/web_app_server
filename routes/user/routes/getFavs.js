const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;

module.exports = async (req, res) => {
    try {
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
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
    

}