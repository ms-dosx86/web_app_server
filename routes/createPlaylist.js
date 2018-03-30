const User = require('../models/user').UserModel;
const Playlist = require('../models/playlist').PlaylistModel;

module.exports = function(req, res) {
    User.findOne( { password: req.body.id }, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            const playlist = new Playlist({
                title: req.body.playlist.title,
                description: req.body.playlist.description,
                img: req.body.playlist.img,
                tags: req.body.playlist.tags,
                list: req.body.playlist.list
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
                });
            });
        }
    })
}