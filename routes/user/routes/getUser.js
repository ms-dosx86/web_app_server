const User = require('../../../models/user').UserModel;

module.exports = (req, res) => {
    User.findById(req.body._id, (err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            const response = {
                success: true,
                msg: 'юзер найден',
                body: user
            }
            res.send(response);
        } else {
            const response = {
                success: false,
                msg: 'юзер не найден'
            }
            res.send(response);
        }
    })
}