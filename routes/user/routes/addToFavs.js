const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-------------------------------ADDING IN FAVS----------------------------');
        const user = await User.findById(req.params.id);
        const response = {};
        if (user === null) {
            response.success = false;
            response.msg = 'user not found';
            res.send(response);
        } else {
            const playlist = req.body;
            user.favs.push(playlist);
            await user.save();
            response.success = true;
            response.msg = 'playlist added';
            res.send(response);
        }
        logger(path_to_logs, '-------------------------------ADDING IN FAVS IS FINISHED----------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_logs, '-------------------------------ADDING IN FAVS IS CRASHED----------------------------');
        logger(path_to_err_logs, 'ERROR WITH ADDING IN FAVS: ' + e.message);
    }
}