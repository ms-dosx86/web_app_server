const authorize = require('../methods/authorize');
const fs = require('fs');
const util = require('util');
fs.readFile = util.promisify(fs.readFile);
let params = require('../params');

module.exports = async (req, res) => {
    try {
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
    }
}