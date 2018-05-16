const User = require('../../../models/user').UserModel;
const sha1 = require('sha1');
const fs = require('fs');
const path = require('../../../config').path;
const util = require('util');
fs.mkdir = util.promisify(fs.mkdir);

module.exports = async (req, res) => {
    try {
        const user = new User({
            login: req.body.login.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: sha1(req.body.password),
            img: '',
            playlists: [],
            favs: []
        });
        let from = path + '/defaults/avatar_default.jpg';
        let to = path + '/files/images/avatars/' + user._id + '.jpg';
        await fs.copyFile(from, to);
        user.img = user._id + '.jpg';
        await user.save()
            .catch(e => { throw new Error('ошибка при сохранении юзера'); });
        console.log(`${user.login} is saved`);
        const response = {
            success: true,
            msg: 'user was registrated',
            cookies: user._id
        }
        res.send(response);
    } catch (e) {
        const response = {
            success: false,
            msg: e
        }
        res.send(response);
    }
}