const User = require('../../../models/user').UserModel;

module.exports = (req, res) => {
    User.findOne({ login: req.params.login.toLowerCase() }, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            const response = {
                success: false,
                msg: 'пользователь с таким логином уже зарегистрирован'
            }
            res.send(response);
        } else {
            const response = {
                success: true,
                msg: 'пользователя с таким логином нет'
            }
            res.send(response);
        }
    })
}