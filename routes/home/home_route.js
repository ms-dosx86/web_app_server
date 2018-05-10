const router = require('express').Router();
const Playlist = require('../../models/playlist').PlaylistModel;
const Tag = require('../../models/tag').TagModel;

router.get('/', async (req, res) => {
    try {
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
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
})

module.exports = router;