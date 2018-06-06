const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------UPDATING STATUS-------------------------');
        let user = await User.findById(req.body.id);
        user.status = req.body.status;
        await user.save();
        logger(path_to_logs, 'users status was changed');
        const response = {
            success: true,
            msg: 'users status was changed'
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------UPDATING STATUS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH UPDATING STATUS ' + e.message);
        logger(path_to_logs, '-----------------------------UPDATING STATUS IS CRASHED-------------------------');
    }
}