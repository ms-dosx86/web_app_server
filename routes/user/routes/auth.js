const User = require('../../../models/user').UserModel;
const sha1 = require('sha1');

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login.toLowerCase() });
        if (user === null) throw new Error('юзер не был найден');
        let password = sha1(req.body.password + user.salt);
        if (user.password != password) throw new Error('неправильный пароль');
        const response = {
            success: true,
            msg: 'юзер найден',
            cookies: user._id
        }
        res.send(response);
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}