const mongoose = require('mongoose');
const playlist = require('./playlist').PlaylistSchema;

const UserSchema = new mongoose.Schema({
    login: String,
    email: String,
    password: String,
    img: String,
    playlists: [playlist]
});

module.exports.UserSchema = UserSchema;
module.exports.UserModel = mongoose.model('User', UserSchema);