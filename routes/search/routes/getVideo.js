const authorize = require('../methods/authorize');
const fs = require('fs');
const util = require('util');
fs.readFile = util.promisify(fs.readFile);
let params = require('../params');
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING VIDEO-------------------------');
        let credentials = await fs.readFile('client_secret.json');
        credentials = JSON.parse(credentials);
        params.videos.params.id = req.params.id;
        authorize(credentials, params, res, 'video');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING VIDEO: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING VIDEO IS CRASHED-------------------------');
    }
}