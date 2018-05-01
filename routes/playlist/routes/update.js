const Playlist = require('../../../models/playlist').PlaylistModel;
const User = require('../../../models/user').UserModel;
const Tag = require('../../../models/tag').TagModel;
const formidable = require('formidable');
const path = require('../../../config').path;
const sharp = require('sharp');
const fs = require('fs')

module.exports = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) throw err;
            fields.playlist = JSON.parse(fields.playlist);
            let user = await User.findById(fields.id);
            if (user === null) throw new Error('user not found');
            let pl1 = await Playlist.findById(fields.playlist._id);
            if (pl1 === null) throw new Error('playlist not found');
            let pl = fields.playlist;
            for (let i = 0; i < pl.tags.length; i++) {
                let t = await Tag.findOne({ name: pl.tags[i] });
                if (t === null) {
                    let t = new Tag({
                        name: pl.tags[i]
                    });
                    await t.save();
                    pl.tags[i] = t;
                } else {
                    t.count++;
                    await t.save();
                    pl.tags[i] = t;
                }
            }
            if (typeof files.img == 'undefined') {
                // let from = path + '/defaults/default.jpg';
                // let to = path + '/files/images/playlists/' + playlist._id + '.jpg';
                // await fs.copyFile(from, to);
            } else {
                console.log('object');
                let type = '';
                files.img.type == 'image/png' ? type = '.png' : type = '.jpg';
                console.log(type);
                let oldpath = files.img.path;
                let newpath = path + '/files/temp/' + pl._id + type;
                await fs.rename(oldpath, newpath);
                console.log('was moved to temp');
                let img = await sharp(path + '/files/temp/' + pl._id + type);
                console.log(pl._id + type)
                let i = await img.resize(500, 500).toFile(path + '/files/images/playlists/' + pl._id + type);
                pl1.img = pl._id + type;
                console.log(`img was resized`)                    
            }
            pl1.title = pl.title;
            pl1.description = pl.description;
            pl1.tags = pl.tags;
            pl1.list = pl.list;
            await pl1.save();
            console.log('playlist updated');
            for (let i = 0; i < user.playlists.length; i++) {
                if (user.playlists[i]._id == pl1._id) {
                    user.playlists[i] = pl1;
                }
            }
            await user.save();
            console.log('user updated');
            res.end();
        })
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}