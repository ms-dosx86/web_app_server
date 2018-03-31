const User = require('../models/user').UserModel;
const sha1 = require('sha1');

module.exports = function(req, res) {
    const user = new User({
        login: req.body.login.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: sha1(req.body.password),
        playlists: []
    });
    user.save().then(() => {
        console.log('user was saved');
        const response = {
            success: true,
            msg: 'user was registrated',
            cookies: user._id
        }
        res.send(response);
    }, (e) => {
        console.log(e);
        const response = {
            success: false,
            msg: 'user wasnt regitered'
        }
        res.send(response);
    });
}