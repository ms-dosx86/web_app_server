const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------UPDATING EMAIL-------------------------');
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
            logger(path_to_logs, 'users email was changed');
            const response = {
                success: true,
                msg: 'users email was changed'
            }
            res.send(response);
            logger(path_to_logs, '-----------------------------UPDATING EMAIL IS FINISHED-------------------------');
        }
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH UPDATING EMAIL: ' + e.message);
        logger(path_to_logs, '-----------------------------UPDATING EMAIL IS CRASHED-------------------------');
    }
}