const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        let user = await User.findById(req.body.id);
        user.status = req.body.status;
        await user.save();
        console.log('users status was changed');
        const response = {
            success: true,
            msg: 'users status was changed'
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