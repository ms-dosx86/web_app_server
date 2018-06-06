const User = require('../../../models/user').UserModel;
const sha1 = require('sha1');
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------AUTH-------------------------');
        const user = await User.findOne({ login: req.body.login.toLowerCase() });
        if (user === null) throw new Error('юзер не был найден');
        let password = sha1(req.body.password + user.salt);
        if (user.password != password) throw new Error('неправильный пароль');
        const response = {
            success: true,
            msg: 'юзер найден',
            cookies: user._id
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------AUTH IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH AUTH: ' + e.message);
        logger(path_to_logs, '-----------------------------AUTH IS CRASHED-------------------------');
    }
}