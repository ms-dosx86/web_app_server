const authorize = require('../methods/authorize');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
let params = require('../params');
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING VIDEOS-------------------------');
        let credentials = await readFile('client_secret.json');
        credentials = JSON.parse(credentials);
        params.searchList.params.q = req.params.query;
        params.searchList.params.pageToken = req.params.token;
        authorize(credentials, params, res, 'list');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING VIDEOS: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING VIDEOS IS CRASHED-------------------------');
    }
}