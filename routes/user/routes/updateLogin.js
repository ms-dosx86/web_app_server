const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------UPDATING LOGIN-------------------------');
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
            logger(path_to_logs, 'users login was changed');
            const response = {
                success: true,
                msg: 'users login was changed'
            }
            res.send(response);
            logger(path_to_logs, '-----------------------------UPDATING LOGIN IS FINISHED-------------------------');
        }
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH UPDATING LOGIN: ' + e.message);
        logger(path_to_logs, '-----------------------------UPDATING LOGIN IS CRASHED-------------------------');
    }
}