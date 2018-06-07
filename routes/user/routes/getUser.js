const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GET USER-------------------------');
        const user = await User.findById(req.params.id);
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
        logger(path_to_logs, '-----------------------------GET USER IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING USER: ' + e.message);
        logger(path_to_logs, '-----------------------------GET USER IS CRASHED-------------------------');
    }
}