const arr = [
    '5b1f6d9387af6c0a7d90dc6a',
    '5b1f6c7387af6c0a7d90dc58',
    '5b1f6bae87af6c0a7d90dc44',
    '5b1f6ae887af6c0a7d90dc30',
    '5b1f698b87af6c0a7d90dc19',
    '5b1f683187af6c0a7d90dc06',
    '5b1f66f687af6c0a7d90dbf3',
    '5b1f660687af6c0a7d90dbdc',
    '5b1f64a487af6c0a7d90dbca',
    '5b1f62aa87af6c0a7d90dbb3'
]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Playlist = require('../../../models/playlist').PlaylistModel;
module.exports = async (req, res) => {
    try {
        arr.forEach(async item => {
            let pl = await Playlist.findById(item);
            pl.viewCount = getRandomInt(100, 200) * 1 * 2 * 3;
            await pl.save();
            console.log('ok');
        });
        res.end();
    } catch (e) {
        console.log(e);
    }
}