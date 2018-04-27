const authorize = require('../methods/authorize');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
let params = require('../params');

module.exports = async (req, res) => {
    try {
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
    }
}