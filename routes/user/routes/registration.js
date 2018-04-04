const User = require('../../../models/user').UserModel;
const sha1 = require('sha1');

module.exports = async (req, res) => {
    try {
        const user = new User({
            login: req.body.login.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: sha1(req.body.password),
            img: '',
            playlists: []
        });
        await user.save()
            .catch(e => { throw new Error('ошибка при сохранении юзера'); });
        console.log('user is saved');
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