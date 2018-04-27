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
    let video = {
        id: result.items[0].id,
        title: result.items[0].snippet.title,
        description: result.items[0].snippet.description,
        img: result.items[0].snippet.thumbnails.default.url,
        duration: formatDuration(result.items[0].contentDetails.duration),
        viewCount: formatViews(result.items[0].statistics.viewCount)
    }
    return video;
}