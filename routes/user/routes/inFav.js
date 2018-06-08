const User = require('../../../models/user').UserModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-------------------------------CHECKING IN FAVS----------------------------');
        const user = await User.findById(req.params.user_id);
        if (user === null) {
            const response = {
                success: false,
                msg: 'user was not found'
            }
            res.send(response);
        } else {
            const response = {
                success: true,
                msg: ''
            }
            const favs = user.favs;
            let check = false;
            favs.forEach(fav => {
                if (fav._id == req.params.playlist_id) {
                    response.msg = 'playlist in favs';
                    check = true;
                    return;
                }
            });
            if (check == false) {
                response.success = false;
                response.msg = 'playlist is not found';
            }
            res.send(response);
        }
        logger(path_to_logs, '-------------------------------CHECKING IN FAVS IS FINISHED----------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_logs, '-------------------------------CHECKING IN FAVS IS CRASHED----------------------------');
        logger(path_to_err_logs, 'ERROR WITH CHECKING IN FAVS: ' + e.message);
    }
}