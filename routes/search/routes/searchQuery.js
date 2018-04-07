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
        authorize(credentials, params, res);
    } catch (e) {
        console.log(e.message);
    }
}