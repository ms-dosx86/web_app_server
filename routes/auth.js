const User = require('../models/user').UserModel;
const sha1 = require('sha1');

module.exports = function(req, res) {
    User.findOne({ login: req.body.login.toLowerCase(), password: sha1(req.body.password) }, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            const response = {
                success: true,
                msg: 'юзер был авторизован',
                cookies: sha1(req.body.password)
            }
            res.send(response);
        } else {
            const response = {
                success: false,
                msg: 'юзер не был авторизован'
            }
            res.send(response);
        }
    })
}