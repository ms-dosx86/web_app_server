function removeEmptyParameters(params) {
    for (var p in params) {
      if (!params[p] || params[p] == 'undefined') {
        delete params[p];
      }
    }
    return params;
}


module.exports = async (req, res) => {
    try {
        const fs = require('fs');
        const readline = require('readline');
        const google = require('googleapis');
        const googleAuth = require('google-auth-library');
        const util = require('util');
        const readFile = util.promisify(fs.readFile);
        const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
        const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
            process.env.USERPROFILE) + '/.credentials/';
        const TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json';

        let credentials = await readFile('client_secret.json');
        credentials = JSON.parse(credentials);
        let requestData = {
            'params': {
                'maxResults': '25',
                'part': 'snippet',
                'q': req.params.query,
                'type': 'video' 
            }
        }
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
                    oauth2Client.credentials = token1;
                    fs.mkdirSync(TOKEN_DIR);
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token1));
                    console.log('Token stored to ' + TOKEN_PATH);
                    token = await readFile(TOKEN_PATH);
                    oauth2Client.credentials = JSON.parse(token);
                    let service = google.youtube('v3');
                    let parameters = removeEmptyParameters(requestData['params']);
                    parameters['auth'] = oauth2Client;
                    service.search.list = util.promisify(service.search.list);
                    let result = await service.search.list(parameters);
                    let ids = [];
                    for (let i = 0; i < result.items.length; i++) {
                        ids.push(result.items[i].id.videoId);
                    }
                    let videoParams = {
                        'params': {
                            'id': ids.join(),
                            'part': 'snippet,contentDetails,statistics'
                        }
                    }
                    videoParams = removeEmptyParameters(videoParams['params']);
                    videoParams['auth'] = oauth2Client;
                    service.videos.list = util.promisify(service.videos.list);
                    let videos = await service.videos.list(videoParams);
                    res.send(videos);
                });
            })
            
        } else {
            oauth2Client.credentials = JSON.parse(token);
            let service = google.youtube('v3');
            let parameters = removeEmptyParameters(requestData['params']);
            parameters['auth'] = oauth2Client;
            service.search.list = util.promisify(service.search.list);
            let result = await service.search.list(parameters);
            let ids = [];
            for (let i = 0; i < result.items.length; i++) {
                ids.push(result.items[i].id.videoId);
            }
            let videoParams = {
                'params': {
                    'id': ids.join(),
                    'part': 'snippet,contentDetails,statistics'
                }
            }
            videoParams = removeEmptyParameters(videoParams['params']);
            videoParams['auth'] = oauth2Client;
            service.videos.list = util.promisify(service.videos.list);
            let videos = await service.videos.list(videoParams);
            res.send(videos);
        }
        
    } catch (e) {
        console.log(e.message);
    }
}