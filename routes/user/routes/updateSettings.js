const User = require('../../../models/user').UserModel;

module.exports = (req, res) => {
    User.findById(req.body._id, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            user.login = req.body.login;
            user.email = req.body.email;
            user.password = req.body.password;
            user.img = req.body.img;
            user.save().then(() => {
                const response = {
                    success: true,
                    msg: 'данные пользователя были обновлены'
                }
                res.send(response);
            }, (e) => {
                console.log(e);
                const response = {
                    success: false,
                    msg: 'данные пользователя не были обновлены, произошла ошибка при сохранении данных'
                }
                res.send(response);
            });
        } else {
            const response = {
                success: false,
                msg: 'пользователь не найден'
            }
            res.send(response);
        }
    })
}