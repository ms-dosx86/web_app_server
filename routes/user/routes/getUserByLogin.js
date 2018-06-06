const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GET USER BY LOGIN-------------------------');
        const user = await User.findOne({ login: req.params.login });
        if (user === null) throw new Error(`пользователь не был найден`);
        let usr = {
            login: user.login,
            email: user.email,
            _id: user._id,
            img: user.img,
            status: user.status
        }
        const response = {
            success: true,
            msg: 'юзер найден',
            body: usr
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------GET USER BY LOGIN IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING USER BY LOGIN: ' + e.message);
        logger(path_to_logs, '-----------------------------GET USER BY LOGIN IS CRASHED-------------------------');
    }
}