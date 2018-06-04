const User = require('../../../models/user').UserModel;
const Playlist = require('../../../models/playlist').PlaylistModel;
const Tag = require('../../../models/tag').TagModel;
const formidable = require('formidable');
const path = require('../../../config').path;
const fs = require('fs');
const util = require('util');
const sharp = require('sharp');
fs.mkdir = util.promisify(fs.mkdir);
fs.rename = util.promisify(fs.rename);
fs.readFile = util.promisify(fs.readFile);
fs.copyFile = util.promisify(fs.copyFile);

module.exports = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) throw err;
            if (fields.playlist === 'undefined') {
                const response = {
                    success: false,
                    msg: 'playlist was undefined'
                }
                res.send(response);
            } else {
                fields.playlist = JSON.parse(fields.playlist);
                let user = await User.findById(fields.id);
                if (user === null) throw new Error('пользователь не был найден');
                const plylist = fields.playlist;
                let tags = [];
                for (let i = 0; i < plylist.tags.length; i++) {
                    let t = await Tag.findOne({ name: plylist.tags[i].toLowerCase() });
                    if (t === null) {
                        let tag = new Tag({
                            name: plylist.tags[i].toLowerCase()
                        });
                        await tag.save();
                        tags.push(tag);
                    } else {
                        t.count++;
                        await t.save();
                        tags.push(t);
                    }
                }
                const playlist = new Playlist({
                    title: plylist.title.toLowerCase(),
                    description: plylist.description.toLowerCase(),
                    tags: tags,
                    list: plylist.tracks,
                    creator: {
                        name: user.login,
                        img: user.img
                    }
                });
                await playlist.save()
                    .catch(e => { throw new Error('ошибка при сохранении плейлиста'); });
                console.log('плекйлист был создан');
                if (typeof files.img == 'undefined') {
                    let from = path + '/defaults/default.jpg';
                    let to = path + '/files/images/playlists/' + playlist._id + '.jpg';
                    await fs.copyFile(from, to);
                } else {
                    let type = '';
                    files.img.type == 'image/png' ? type = '.png' : type = '.jpg';
                    let oldpath = files.img.path;
                    let newpath = path + '/files/temp/' + playlist._id + type;
                    await fs.copyFile(oldpath, newpath);
                    console.log('was moved to temp');
                    let img = await sharp(path + '/files/temp/' + playlist._id + type);
                    let i = await img.resize(500, 500).toFile(path + '/files/images/playlists/' + playlist._id + type);
                    console.log(`img was resized`)                    
                }
                playlist.img = playlist._id + '.jpg';
                await playlist.save()
                    .catch(e => { throw new Error('ошибка при сохранении плейлиста'); });
                console.log('плекйлист был перезаписан');  
                user.playlists.push(playlist);
                await user.save()
                    .catch(e => { throw new Error('ошибка при добавлении плейлиста в список'); });
                console.log('playlist was added');
                const response = {
                    success: true,
                    msg: 'playlist was created'
                }
                res.send(response);
            }
        })
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}