const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        let user = await User.findById(req.body._id);
        if (user === null) throw new Error('пользователь не был найден');
        user.login = req.body.login;
        user.email = req.body.email;
        user.password = req.body.password;
        user.img = req.body.img;
        await user.save()
            .catch(e => { throw new Error('данные пользователя не были обновлены, произошла ошибка при сохранении данных'); });
        const response = {
            success: true,
            msg: 'данные пользователя были обновлены'
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