const google = require('googleapis');
const removeEmptyParameters = require('./removeEmptyParameters');
const util = require('util');

module.exports = async (oauth2Client, requestData) => {
    let service = google.youtube('v3');
    let parameters = removeEmptyParameters(requestData['params']);
    parameters['auth'] = oauth2Client;
    service.search.list = util.promisify(service.search.list);
    return await service.search.list(parameters);
}