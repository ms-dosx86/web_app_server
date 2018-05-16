const mongoose = require('mongoose');
const Playlist = require('./playlist').PlaylistSchema;

const UserSchema = new mongoose.Schema({
    login: String,
    email: String,
    password: String,
    img: String,
    playlists: [Playlist],
    favs: [Playlist]
});

module.exports.UserSchema = UserSchema;
module.exports.UserModel = mongoose.model('User', UserSchema);