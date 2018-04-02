const User = require('../../../models/user').UserModel;

module.exports = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            const response = {
                success: true,
                msg: 'юзер найден',
                body: {
                    login: user.login,
                    email: user.email,
                    img: user.img,
                    password: user.password
                }
            }
            res.send(response);
        } else {
            const response = {
                success: false,
                msg: 'Юзер не найден'
            }
            res.send(response);
        }
    })
}