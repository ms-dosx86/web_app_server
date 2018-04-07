const mongoose = require('mongoose');

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
    tags: [String]
});

module.exports.PlaylistSchema = PlaylistSchema;
module.exports.PlaylistModel = mongoose.model('Playlist', PlaylistSchema);