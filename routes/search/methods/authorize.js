const googleAuth = require('google-auth-library');
const fs = require('fs');
const util = require('util');
const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];
const readline = require('readline');
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'api.json';
const getSearchListByKeyword = require('./getSearchListByKeyword');
const getVideosByIds = require('./getVideosByIds');
const getVideo = require('./getVideo');
const logger = require('../../../functions/logger');
const path_to_err_logs = require('../../../config').path_to_err_logs;
const path_to_logs = require('../../../config').path_to_logs;

fs.readFile = util.promisify(fs.readFile);
fs.mkdir = util.promisify(fs.mkdir);
fs.writeFile = util.promisify(fs.writeFile);

module.exports = async (credentials, params, res, type) => {
    try {
        let clientSecret = credentials.installed.client_secret;
        let clientId = credentials.installed.client_id;
        let redirectUrl = credentials.installed.redirect_uris[0];
        let auth = new googleAuth();
        let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
        let token = await fs.readFile(TOKEN_PATH).catch(() => {});
        if (typeof token === 'undefined') {
            let authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES
            });
            console.log('Authorize this app by visiting this url: ', authUrl);
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Enter the code from that page here: ', code => {
                rl.close();
                oauth2Client.getToken(code, async (err, token1) => {
                    if (err) throw err;
                    await fs.mkdir(TOKEN_DIR);
                    await fs.writeFile(TOKEN_PATH, JSON.stringify(token1));
                    logger(path_to_logs, 'Token stored to ' + TOKEN_PATH);
                    token = await fs.readFile(TOKEN_PATH);
                    oauth2Client.credentials = JSON.parse(token.toString('utf8'));
                    switch (type) {
                        case 'list':
                            let result = await getSearchListByKeyword(oauth2Client, params.searchList);
                            let ids = result.items.map(item => item.id.videoId);
                            params.videos.params.id = ids.join();
                            let videos = await getVideosByIds(oauth2Client, params.videos);
                            const response = {
                                success: true,
                                msg: 'данные были получены',
                                body: {
                                    nextPageToken: result.nextPageToken,
                                    prevPageToken: result.prevPageToken,
                                    pagesCount: (result.pageInfo.totalResults/result.pageInfo.resultsPerPage).toFixed(),
                                    videos: videos
                                }
                            }
                            res.send(response);
                            logger(path_to_logs, '-----------------------------GETTING VIDEOS IS FINISHED-------------------------');
                            break;
                        case 'video':
                            let video = await getVideo(oauth2Client, params.videos);
                            response = {
                                success: true,
                                msg: 'данные были получены',
                                body: video
                            }
                            res.send(response);
                            logger(path_to_logs, '-----------------------------GETTING VIDEO IS FINISHED-------------------------');
                            break;
                    }
                    
                });
            })
        } else {
            oauth2Client.credentials = JSON.parse(token);
            const response = {};
            switch (type) {
                case 'list':
                    let result = await getSearchListByKeyword(oauth2Client, params.searchList);
                    let ids = result.items.map(item => item.id.videoId);
                    params.videos.params.id = ids.join();
                    let videos = await getVideosByIds(oauth2Client, params.videos);
                    response.success = true;
                    response.msg = 'данные были получены';
                    response.body = {
                        nextPageToken: result.nextPageToken,
                        prevPageToken: result.prevPageToken,
                        pagesCount: (result.pageInfo.totalResults/result.pageInfo.resultsPerPage).toFixed(),
                        videos: videos
                    }
                    res.send(response);
                    logger(path_to_logs, '-----------------------------GETTING VIDEOS IS FINISHED-------------------------');
                    break;
                case 'video':
                    let video = await getVideo(oauth2Client, params.videos);
                    response.success = true;
                    response.msg = 'данные были получены';
                    response.body = video;
                    res.send(response);
                    logger(path_to_logs, '-----------------------------GETTING VIDEO IS FINISHED-------------------------');
                    break;
                default:
                    break;
            }
        }
    } catch (e) {
        const response = {
            success: false,
            msg: e.message
        }
        res.send(response);
        logger(path_to_err_logs, 'ERROR WITH GETTING VIDEO ' + e.message);
        logger(path_to_logs, '-----------------------------GETTING VIDEO IS CRASHED-------------------------');
    }
    
}