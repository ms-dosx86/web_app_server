const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;

module.exports = function(req, res) {
    User.findById(req.body.id, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            const plylist = req.body.playlist;
            const playlist = new Playlist({
                title: plylist.title,
                description: plylist.description,
                img: plylist.img,
                tags: plylist.tags,
                list: plylist.list
            });
            playlist.save().then(() => {
                console.log('плекйлист был создан');
                user.playlists.push(playlist);
                user.save().then(() => {
                    console.log('playlist was added');
                    const response = {
                        success: true,
                        msg: 'playlist was added'
                    }
                    res.send(response);
                }, (e) => {
                    console.log(e);
                    const response = {
                        success: false,
                        mas: 'playlist wasnt added'
                    }
                    res.send(response);
                }, (e) => console.log('ошибка при сохранении плейлиста'));
            });
        }
    })
}