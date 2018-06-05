const fs = require('fs');
const util = require('util');
const logger = require('./logger');
const log_path = require('../config').path_to_logs;
fs.readdir = util.promisify(fs.readdir);
fs.unlink = util.promisify(fs.unlink);

module.exports = async path => {
    try {
        let files = await fs.readdir(path).catch(e => { throw e });
        if (files.length > 0) {
            files.forEach(async file => {
                await fs.unlink(path + '/' + file);
            });
            logger(log_path, 'files were deleted from ' + path);
        }
    } catch (e) {
        logger(log_path, e.message);
    }
}