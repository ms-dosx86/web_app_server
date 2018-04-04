const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user === null) throw new Error('юзер не был найден');
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
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}