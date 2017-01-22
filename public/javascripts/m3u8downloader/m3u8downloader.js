var path = require('path');
var fetch = require('fetch');
var m3u8Parser = require('./m3u8parser.js');

function download(inputResource, complete) {

    var uri = inputResource.uri;
    var dir = inputResource.dir;
    var fileName = inputResource.fileName;

    fetch.fetchUrl(uri, function getPlaylist(err, meta, body) {

        if (err) {
            console.error('Error downloading url:', uri);
            return complete(err);
        }

        if (body.toString().match(/#EXTINF/)) {
            var mediaPlaylist = {
                uri: uri,
                segments: []
            };
            m3u8Parser.parseMediaPlaylist(mediaPlaylist, streamSegmentsToDisk);
        }

        function streamSegmentsToDisk(playlist) {

            var rootUri = path.dirname(playlist.uri);
            streamToDisk = playlist.streamToDisk.bind(playlist);
            streamToDisk(rootUri, fileName, dir, streamSegmentsToDisk, streamingWasFinished);
        }

        function streamingWasFinished(path) {

            return complete(err, path)
        }
    });
}
module.exports.downloadPlaylistSegments = download;