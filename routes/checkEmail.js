const User = require('../models/user').UserModel;

module.exports = (req, res) => {
    User.findOne({ email: req.params.email.toLowerCase() }, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            const response = {
                success: false,
                msg: 'пользователь с таким email уже зарегистрирован'
            }
            res.send(response);
        } else {
            const response = {
                success: true,
                msg: 'пользователя с таким email нет'
            }
            res.send(response);
        }
    })
}