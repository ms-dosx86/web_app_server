const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        let checkUser = await User.findOne({ login: req.body.login });
        if (checkUser != null) {
            const response = {
                success: false,
                msg: 'user with the same login already exist'
            }
            res.send(response);
        } else {
            let user = await User.findById(req.body.id);
            user.login = req.body.login;
            await user.save();
            console.log('users login was changed');
            const response = {
                success: true,
                msg: 'users login was changed'
            }
            res.send(response);
        }
        
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}