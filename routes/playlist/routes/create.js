const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;
const formidable = require('formidable');
const path = require('../../../config').path;
const fs = require('fs');
const util = require('util');
fs.mkdir = util.promisify(fs.mkdir);
fs.rename = util.promisify(fs.rename);

module.exports = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) throw err;
            fields.playlist = JSON.parse(fields.playlist);
            let user = await User.findById(fields.id);
            if (user === null) throw new Error('пользователь не был найден');
            const plylist = fields.playlist;
            plylist.tags.forEach(item => {
                item = item.toLowerCase()
            });
            const playlist = new Playlist({
                title: plylist.title.toLowerCase(),
                description: plylist.description.toLowerCase(),
                img: files.img.name,
                tags: plylist.tags,
                list: plylist.tracks
            });
            await playlist.save()
                .catch(e => { throw new Error('ошибка при сохранении плейлиста'); });
            console.log('плекйлист был создан');
            let oldpath = files.img.path;
            let newpath = path + '/files/users/' + fields.id + '/images/playlists/' + files.img.name;
            await fs.rename(oldpath, newpath);
            user.playlists.push(playlist);
            await user.save()
                .catch(e => { throw new Error('ошибка при добавлении плейлиста в список'); });
            console.log('playlist was added');
            const response = {
                success: true,
                msg: 'playlist was created'
            }
            res.send(response);
        })
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}