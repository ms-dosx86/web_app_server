const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user === null) throw new Error(`пользователь не был найден`);
        let usr = {
            login: user.login,
            email: user.email,
            _id: user._id,
            img: user.img,
            status: user.status
        }
        const response = {
            success: true,
            msg: 'юзер найден',
            body: usr
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