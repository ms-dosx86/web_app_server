const Tag = require('../../../models/tag').TagModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------GETTING LIST OF TAGS-------------------------');
        let name = req.params.name;
        let re = new RegExp('^(' + name + ')', 'ig');
        let tags = await Tag.find({name: re});
        let i = 0;
        let arrTags = [];
        while (arrTags.length < 10 && i < tags.length) {
            arrTags.push(tags[i]);
            i++;
        }
        const response = {
            success: true,
            msg: 'tags given',
            body: arrTags
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------GETTING LIST OF TAGS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING LIST OF TAGS: ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING LIST OF TAGS IS CRASHED-------------------------');
    }
}