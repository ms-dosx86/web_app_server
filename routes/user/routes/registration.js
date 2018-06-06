const User = require('../../../models/user').UserModel;
const sha1 = require('sha1');
const fs = require('fs');
const path = require('../../../config').path;
const util = require('util');
const crypto = require('crypto');
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;
fs.mkdir = util.promisify(fs.mkdir);
fs.copyFile = util.promisify(fs.copyFile);

function exists(path) {
    return new Promise(resolve => {
        fs.exists(path, resolve);
    })
}

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------REGISTRATION-------------------------');
        const salt = crypto.randomBytes(32).toString('hex');
        const user = new User({
            login: req.body.login.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: sha1(req.body.password + salt),
            salt: salt,
            img: '',
            playlists: [],
            favs: []
        });
        let isExist = await exists(path + '/files');
        if (!isExist) {
            await fs.mkdir(path + '/files');
            await fs.mkdir(path + '/files/images');
            await fs.mkdir(path + '/files/images/avatars');
            await fs.mkdir(path + '/files/images/playlists');
            await fs.mkdir(path + '/files/temp');
        }
        let from = path + '/defaults/avatar_default.jpg';
        let to = path + '/files/images/avatars/' + user._id + '.jpg';
        await fs.copyFile(from, to);
        user.img = user._id + '.jpg';
        await user.save().catch(e => { throw new Error('ошибка при сохранении юзера'); });
        logger(path_to_logs, `${user.login} is saved`);
        const response = {
            success: true,
            msg: 'user was registrated',
            cookies: user._id
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------REGISTRATION IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH REGISTRATION: ' + e.message);
        logger(path_to_logs, '-----------------------------REGISTRATION IS CRASHED-------------------------');
    }
}