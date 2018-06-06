const router = require('express').Router();
const Playlist = require('../../models/playlist').PlaylistModel;
const Tag = require('../../models/tag').TagModel;
const logger = require('../../functions/logger');
const path_to_err_logs = require('../../config').path_to_err_logs;
const path_to_logs = require('../../config').path_to_logs;

router.get('/', async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------LOADING HOME-------------------------');
        let top_playlists = await Playlist.find().sort({ viewCount: -1 }).limit(8);
        let top_tags = await Tag.find().sort({ count: -1 }).limit(3);
        let by_tags = [];
        for (item of top_tags) {
            let list = await Playlist.find({
                tags: {
                    $in: [item]
                }
            }).sort({ viewCount: -1 }).limit(8);
            let obj = {
                tag: item.name,
                playlists: list
            }
            by_tags.push(obj);
        }
        const response = {
            success: true,
            msg: 'tags and playlists was received',
            body: {
                top: top_playlists,
                by_tags: by_tags
            }
        }
        res.send(response);
        logger(path_to_logs, '-----------------------------LOADING HOME IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH LOADING HOME: ' + e.message);
        logger(path_to_logs, '-----------------------------LOADING HOME IS CRASHED-------------------------');
    }
})

module.exports = router;