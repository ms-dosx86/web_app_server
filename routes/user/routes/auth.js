const User = require('../../../models/user').UserModel;
const sha1 = require('sha1');

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login.toLowerCase(), password: sha1(req.body.password) });
        if (user === null) throw new Error(`юзер не был найден`);
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