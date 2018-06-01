const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: String,
    count: {
        type: Number,
        default: 1
    }
});

module.exports.TagSchema = TagSchema;
module.exports.TagModel = mongoose.model('Tag', TagSchema); 