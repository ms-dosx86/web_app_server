const mongoose = require('mongoose');
const Tag = require('./tag').TagSchema;

const PlaylistSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String,
    list: 
    [
        {
            title: String,
            img: String,
            duration: String,
            viewCount: String,
            id: String,
            description: String
        }
    ],
    tags: [Tag],
    viewCount: {
        type: Number,
        default: 0
    },
    creator: {
        name: String,
        img: String
    }
});

module.exports.PlaylistSchema = PlaylistSchema;
module.exports.PlaylistModel = mongoose.model('Playlist', PlaylistSchema);