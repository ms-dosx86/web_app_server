const Tag = require('../../../models/tag').TagModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING ALL TAGS-------------------------');
        let tags = await Tag.find({});
        const response = {
            success: true,
            msg: 'tags are given',
            body: tags
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------GETTING ALL TAGS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING ALL TAGS: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING ALL TAGS IS CRASHED-------------------------');
    }
}