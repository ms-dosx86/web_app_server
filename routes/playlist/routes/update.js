const Playlist = require('../../../models/playlist').PlaylistModel;
const User = require('../../../models/user').UserModel;
const formidable = require('formidable');
const path = require('../../../config').path;
const fs = require('fs');
const util = require('util');
const sharp = require('sharp');
const logger = require('../../../functions/logger');
const path_to_logs = require('../../../config').path_to_logs;
fs.copyFile = util.promisify(fs.copyFile);
fs.unlink = util.promisify(fs.unlink);
fs.readdir = util.promisify(fs.readdir);

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

function resize(image, width, height, path) {
    return new Promise((resolve, reject) => {
        sharp(image).resize(width, height).toFile(path).then(resolve).catch(reject);
    });
}

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '----------------------------PLAYLIST UPDATING--------------------------');
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
                        let filesInTemp = await fs.readdir(path + '/files/temp');
                        filesInTemp.forEach(async file => {
                            let re = new RegExp('^' + playlist._id);
                            if (re.test(file)) {
                                await fs.unlink(path + '/files/temp/' + file);
                                logger(path_to_logs, 'prev image was deleted from /files/temp');
                                return;
                            }
                        });
                        let filesPlaylists = await fs.readdir(path + '/files/images/playlists');
                        filesPlaylists.forEach(async file => {
                            let re = new RegExp('^' + playlist._id);
                            if (re.test(file)) {
                                await fs.unlink(path + '/files/images/playlists/' + file);
                                logger(path_to_logs, 'prev image ' + '/files/images/playlists/' + file + ' was deleted from images');
                                return;
                            }
                        })
                        let type = '.' + files.img.type.replace(/^image\//i, '');
                        let oldpath = files.img.path;
                        let newpath = path + '/files/temp/' + playlist._id + type;
                        await fs.copyFile(oldpath, newpath);
                        logger(path_to_logs, 'image was moved to temp');
                        await resize(path + '/files/temp/' + playlist._id + type, 500, 500, path + '/files/images/playlists/' + playlist._id + type);
                        logger(path_to_logs, 'image was resized');
                        playlist.img = playlist._id + type;
                        user.playlists[index]['img'] = playlist._id + type;
                    }
                    await playlist.save();
                    await user.save();
                    logger(path_to_logs, 'playlist was updated');
                    const response = {
                        success: true,
                        msg: 'playlist was updated'
                    }
                    res.send(response);
                    logger(path_to_logs, '----------------------------PLAYLIST UPDATING FINISHED--------------------------');

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
        logger(path_to_logs, 'ERROR: ' + e.message);
    }
}