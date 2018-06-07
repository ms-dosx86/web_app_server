const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    all_users_count: {
        type: Number,
        default: 0
    },
    all_users_list: {
        type: [String],
        default: []
    }
});

module.exports.StatisticsSchema = StatisticsSchema;
module.exports.StatisticsModel = mongoose.model('Statistics', StatisticsSchema); 