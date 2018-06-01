const Playlist = require('../../../models/playlist').PlaylistModel;
const User = require('../../../models/user').UserModel;

function findIndexById(id, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id == id) {
            return i;
        }
    }
    return -1;
}

module.exports = async (req, res) => {
    try {
        let playlistPrev = req.body;
        let user = await User.findById(playlistPrev.userId);
        let playlist = await Playlist.findById(playlistPrev._id);
        if (user && playlist) {
            let index = findIndexById(playlistPrev._id, user.playlists);
            if (index != -1) {
                for (let key in playlistPrev) {
                    if (playlistPrev[key].isUpdated) {
                        playlist[key] = playlistPrev[key].value;
                        console.log(user.playlists[index][key]);
                        user.playlists[index][key] = playlistPrev[key].value;
                        console.log(user.playlists[index][key]);
                    }
                }
                await playlist.save();
                console.log('playlist was updated');
                await user.save();
                console.log('user\' playlist was updated');
                const response = {
                    success: true,
                    msg: 'playlist was updated'
                }
                res.send(response);
            } else {
                throw new Error('playlist not found in user doc')
            }
        } else {
            throw new Error('playlist or user is not found');
        }
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}