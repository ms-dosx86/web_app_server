const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------CHECKING LOGIN-------------------------');
        const user = await User.findOne({ login: req.params.login.toLowerCase() });
        if (user === null) {
            const response = {
                success: true,
                msg: 'пользователя с таким логином нет'
            }
            res.send(response);
            return;
        }
        const response = {
            success: false,
            msg: 'пользователь с таким логином уже зарегистрирован'
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------CHECKING LOGIN IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH CHECKING LOGIN: ' + e.message);
        logger(path_to_logs, '-----------------------------CHECKING LOGIN IS CRASHED-------------------------');
    }
}