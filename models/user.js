const mongoose = require('mongoose');
const Playlist = require('./playlist').PlaylistSchema;

const UserSchema = new mongoose.Schema({
    login: String,
    email: String,
    password: String,
    salt: String,
    status: {
        type: String,
        default: 'I am gsounds\' user'
    },
    img: String,
    playlists: [Playlist],
    favs: [Playlist],
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports.UserSchema = UserSchema;
module.exports.UserModel = mongoose.model('User', UserSchema);