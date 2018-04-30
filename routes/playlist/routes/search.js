const Playlist = require('../../../models/playlist').PlaylistModel;

module.exports = async (req, res) => {
    try {
        let tags = req.body;
        let playlists = await Playlist.find({});
        const response = {
            success: true,
            msg: 'ok',
            body: {
                tags: [],
                pl: [],
                p: []
            }
        }
        let pl = [];
        for (let i = 0; i < playlists.length; i++) { //playlists
            for (let j = 0; j < playlists[i].tags.length; j++) { //tags of playlists
                let flag = false;
                for (let k = 0; k < tags.length; k++) { //tags from client
                    if (playlists[i].tags[j].name === tags[k].name) {
                        pl.push(playlists[i]);
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    break;
                }
            }
        }
        let p = [ [], [], [], [], [] ];
        for (let i = 0; i < pl.length; i++) {
            let c = 0;
            for (let j = 0; j < pl[i].tags.length; j++) {
                for (let k = 0; k < tags.length; k++) {
                    if (pl[i].tags[j].name === tags[k].name) {
                        c++;
                        break;
                    }
                }
            }
            if (c > 0) {
                p[c - 1].push(pl[i]);
            }
        }

        // for (let i = 0; i < p.length; i++) {
        //     for (let j = 0; j < p[i].length; j++) {
        //         for ()
        //     }
        // }

        response.body.tags = tags;
        response.body.pl = pl;
        response.body.p = p;
        res.send(response);
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
    }
}