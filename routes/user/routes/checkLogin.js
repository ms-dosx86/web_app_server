const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.params.login.toLowerCase() });
        if (user === null) {
            const response = {
                success: true,
                msg: 'пользователя с таким логином нет'
            }
            res.send(response);
            return;
        }
        const response = {
            success: false,
            msg: 'пользователь с таким логином уже зарегистрирован'
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