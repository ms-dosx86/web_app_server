const google = require('googleapis');
const removeEmptyParameters = require('./removeEmptyParameters');
const util = require('util');
const formatDuration = require('./formatDuration');
const formatViews = require('./formatViews');

module.exports = async (oauth2Client, videoParams) => {
    let service = google.youtube('v3');
    let parameters = removeEmptyParameters(videoParams['params']);
    parameters['auth'] = oauth2Client;
    service.videos.list = util.promisify(service.videos.list);
    let result = await service.videos.list(parameters);
    let videos = [];
    for (let i = 0; i < result.items.length; i++) {
        let video = {};
        video.title = result.items[i].snippet.title;
        video.id = result.items[i].id;
        video.description = result.items[i].snippet.description;
        video.img = result.items[i].snippet.thumbnails.default.url;
        video.duration = formatDuration(result.items[i].contentDetails.duration);
        video.viewCount = formatViews(result.items[i].statistics.viewCount);
        videos.push(video);
    }
    return videos;
}