const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        let users = await User.find({});
        const response = {
            success: true,
            msg: 'users were found',
            body: users
        }
        res.send(response);
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
    }
}