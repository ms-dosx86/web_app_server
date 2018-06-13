const Playlist = require('../../../models/playlist').PlaylistModel;
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

module.exports = async (req, res) => {
    try {
        logger(path_to_logs, '-----------------------------SEARCHING PLAYLISTS-------------------------');
        let tags = req.body;
        let page = req.params.page;
        let playlists = await Playlist.find({});
        let response = {
            success: true,
            msg: 'ok',
            body: {}
        }
        let pl = [];
        for (let i = 0; i < playlists.length; i++) { //playlists
            for (let j = 0; j < playlists[i].tags.length; j++) { //tags of playlists
                let flag = false;
                for (let k = 0; k < tags.length; k++) { //tags from client
                    if (playlists[i].tags[j].name === tags[k]) {
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
                    if (pl[i].tags[j].name === tags[k]) {
                        c++;
                        break;
                    }
                }
            }
            if (c > 0) {
                p[c - 1].push(pl[i]);
            }
        }
        for (let i = 0; i < p.length; i++) {
            p[i].sort((a, b) => a.viewCount - b.viewCount);
        }
        let ps = [];
        p.reverse();
        p.forEach(item => {ps = ps.concat(item)});
        let pages = 0;
        playlists = [];
        let i = 0;
        if (ps.length > 10) {
            i = ps.length - page*10 - 1;
        } else {
            i = ps.length - 1;
        }
        pages = (ps.length / 10).toFixed();
        while (playlists.length < 10 && i >= 0) {
            playlists.push(ps[i]);
            i--;
        }
        response.body.playlists = playlists;
        response.body.allPages = pages;
        response.body.count = ps.length;
        res.send(response);
        logger(path_to_logs, '-----------------------------SEARCHING PLAYLISTS IS FINISHED-------------------------');
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH SEARCHING PLAYLISTS: ' + e.message);
        logger(path_to_logs, '-----------------------------SEARCHING PLAYLISTS IS CRASHED-------------------------');
    }
}