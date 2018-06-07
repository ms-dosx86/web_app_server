const Statistics = require('../../../models/statistics').StatisticsModel;
const logger = require('../../../functions/logger');
const path_to_logs = require('../../../config').path_to_logs;
const path_to_err_logs = require('../../../config').path_to_err_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '----------------------------COLLECTING IP ADRESSES---------------------');
        const stats = await Statistics.findOne({ name: 'root' });
        const ip = req.ip;
        if (stats === null) {
            const stats = new Statistics({
                name: 'root'
            });
            stats.all_users_count++;
            stats.all_users_list.push(ip);
            await stats.save();
        } else {
            if (stats.all_users_list.indexOf(ip) == -1) {
                stats.all_users_list.push(ip);
                stats.all_users_count++;
                await stats.save();
            }
        }
        const response = {
            success: true,
            msg: 'ok'
        }
        res.send(response);
        logger(path_to_logs, '----------------------------COLLECTING IP ADRESSES IS FINISHED---------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH COLLECTING IP ADRESSES: ' + e.message);
        logger(path_to_logs, '----------------------------COLLECTING IP ADRESSES IS CRASHED---------------------');
    }
    
}