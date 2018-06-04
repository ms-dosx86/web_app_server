const Playlist = require('../../../models/playlist').PlaylistModel;
const User = require('../../../models/user').UserModel;
const formidable = require('formidable');
const path = require('../../../config').path;
const fs = require('fs');
const util = require('util');
const sharp = require('sharp');
fs.copyFile = util.promisify(fs.copyFile);
fs.unlink = util.promisify(fs.unlink);

function findIndexById(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id == id) {
            return i;
        }
    }
    return -1;
}

function existsAsync(path) {
    return new Promise(function (resolve) {
        fs.exists(path, resolve);
    });
}

module.exports = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) throw err;
            fields.playlist = JSON.parse(fields.playlist);
            let playlistPrev = fields.playlist;
            let user = await User.findById(fields.userId);
            let playlist = await Playlist.findById(playlistPrev._id);
            if (user && playlist) {
                let index = findIndexById(playlistPrev._id, user.playlists);
                if (~index) {
                    for (let key in playlistPrev) {
                        if (playlistPrev[key].isUpdated) {
                            playlist[key] = playlistPrev[key].value;
                            user.playlists[index][key] = playlistPrev[key].value;
                        }
                    }
                    if (files.img) {
                        let prevImg = path + '/files/images/playlists/' + playlist.img;
                        let prevTempImg = path + '/files/temp/' + playlist.img;
                        let exists = await existsAsync(prevImg);
                        exists && await fs.unlink(prevImg);
                        exists = await existsAsync(prevTempImg);
                        exists && await fs.unlink(prevTempImg);
                        let type;
                        files.img.type = 'image/png' ? type = '.png' : type = '.jpg';
                        let oldpath = files.img.path;
                        let newpath = path + '/files/temp/' + playlist._id + type;
                        await fs.copyFile(oldpath, newpath);
                        console.log('image was moved to temp');
                        let img = await sharp(path + '/files/temp/' + playlist._id + type);
                        let i = await img.resize(500, 500).toFile(path + '/files/images/playlists/' + playlist._id + type);
                        console.log('image was resized');
                        playlist.img = playlist._id + type;
                        user.playlists[index]['img'] = playlist._id + type;
                    }
                    await playlist.save();
                    await user.save();
                    console.log('playlist was updated');
                    const response = {
                        success: true,
                        msg: 'playlist was updated'
                    }
                    res.send(response);
                } else {
                    throw new Error('playlist not found');
                }
            } else {
                throw new Error('playlist not found');
            }
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