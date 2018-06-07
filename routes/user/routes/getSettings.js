const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING USERS\' SETTINGS-------------------------');
        const user = await User.findById(req.params.id);
        if (user === null) throw new Error('юзер не был найден');
        const response = {
            success: true,
            msg: 'юзер найден',
            body: {
                login: user.login,
                email: user.email,
                img: user.img,
                password: user.password
            }
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------GETTING USERS\' SETTINGS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING USERS\' SETTINGS: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING USERS\' SETTINGS IS CRASHED-------------------------');
    }
}