const User = require('../../../models/user').UserModel;

module.exports = async (req, res) => {
    try {
        let checkUser = await User.findOne({ email: req.body.email });
        if (checkUser != null) {
            const response = {
                success: false,
                msg: 'user with the same email already exist'
            }
            res.send(response);
        } else {
            let user = await User.findById(req.body.id);
            user.email = req.body.email;
            await user.save();
            console.log('users email was changed');
            const response = {
                success: true,
                msg: 'users email was changed'
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