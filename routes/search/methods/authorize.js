const googleAuth = require('google-auth-library');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];
const readline = require('readline');
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json';
const getSearchListByKeyword = require('./getSearchListByKeyword');
const getVideosByIds = require('./getVideosByIds');

module.exports = async (credentials, params, res) => {
    let clientSecret = credentials.installed.client_secret;
    let clientId = credentials.installed.client_id;
    let redirectUrl = credentials.installed.redirect_uris[0];
    let auth = new googleAuth();
    let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    let token = await readFile(TOKEN_PATH).catch(() => {});
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
                fs.writeFile(TOKEN_PATH, JSON.stringify(token1));
                console.log('Token stored to ' + TOKEN_PATH);
                token = await readFile(TOKEN_PATH);
                oauth2Client.credentials = JSON.parse(token.toString('utf8'));
                let result = await getSearchListByKeyword(oauth2Client, params.searchList);
                let ids = result.items.map(item => item.id.videoId);
                params.videos.params.id = ids.join();
                let videos = await getVideosByIds(oauth2Client, params.videos);
                res.send(videos);
            });
        })
    } else {
        oauth2Client.credentials = JSON.parse(token);
        let result = await getSearchListByKeyword(oauth2Client, params.searchList);
        let ids = result.items.map(item => item.id.videoId);
        params.videos.params.id = ids.join();
        let videos = await getVideosByIds(oauth2Client, params.videos);
        res.send(videos);
    }
}