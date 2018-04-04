const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email.toLowerCase() });
        if (user === null) {
            const response = {
                success: true,
                msg: 'юзера с таким имейлом нет'
            }
            res.send(response);
            return;
        }
        const response = {
            success: false,
            msg: 'пользователь с таким email уже зарегистрирован'
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