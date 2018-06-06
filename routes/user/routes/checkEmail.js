const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------CHECKING EMAIL-------------------------');
        const user = await User.findOne({ email: req.params.email.toLowerCase() });
        if (user === null) {
            const response = {
                success: true,
                msg: 'юзера с таким имейлом нет'
            }
            res.send(response);
            return;
        }
        const response = {
            success: false,
            msg: 'пользователь с таким email уже зарегистрирован'
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------CHECKING EMAIL IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH CHECKING EMAIL: ' + e.message);
        logger(path_to_logs, '-----------------------------CHECKING EMAIL IS CRASHED-------------------------');
    }
}