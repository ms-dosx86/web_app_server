const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;

module.exports = async (req, res) => {
    try {
        let user = await User.findById(req.body.id);
        if (user === null) throw new Error('пользователь не был найден');
        const plylist = req.body.playlist;
        const playlist = new Playlist({
            title: plylist.title,
            description: plylist.description,
            img: plylist.img,
            tags: plylist.tags,
            list: plylist.list
        });
        await playlist.save()
            .catch(e => { throw new Error('ошибка при сохранении плейлиста'); });
        console.log('плекйлист был создан');
        user.playlists.push(playlist);
        await user.save()
            .catch(e => { throw new Error('ошибка при добавлении плейлиста в список'); });
        console.log('playlist was added');
        const response = {
            success: true,
            msg: 'playlist was created'
        }
        res.send(response);
    } catch (e) {
        const response = {
            success: false,
            mas: e.message
        }
        res.send(response);
    }
}