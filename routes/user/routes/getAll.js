const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING ALL USERS-------------------------');
        let users = await User.find({});
        const response = {
            success: true,
            msg: 'users were found',
            body: users
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------GETTING ALL USERS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING ALL USERS: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING ALL USERS IS CRASHED-------------------------');
    }
}