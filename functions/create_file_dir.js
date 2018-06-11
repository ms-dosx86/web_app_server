const fs = require('./fs_async');
const logger = require('./logger');
const log_path = require('../config').path_to_logs;
const err_path = require('../config').path_to_err_logs;

module.exports = async () => {
    try {
        logger(log_path, '-----------CHECKING IS \'FILES\' DIR EXIST-------------');
        const exist = await fs.isExist('files');
        if (!exist) {
            logger(log_path, 'dir doesnt exist');
            logger(log_path, 'creating the dir and its subdirs');
            await fs.mkdir('files/temp');
            await fs.mkdir('files/images');
            await fs.mkdir('files/images/avatars');
            await fs.mkdir('files/images/playlists');
            logger(log_path, 'dir creating is complete');
        }
        logger(log_path, '-----------CHECKING IS \'FILES\' DIR EXIST IS FINISHED-------------');
    } catch (e) {
        logger(err_path, 'ERROR WITH CHECKING \'FILES\' DIR: ' + e.message);
        logger(log_path, '-----------CHECKING IS \'FILES\' DIR EXIST IS CRASHED-------------');
    }
}