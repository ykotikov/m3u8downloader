var path = require('path');
var fetch = require('fetch');
var parse = require('./m3u8parser.js');
var fs = require('fs');


function downloadPlaylistSegments(options, complete) {

    var uri = options.uri;
    var dir = options.dir;
    var fileName = options.fileName;
    var m3u8FileName = path.basename(uri.split(".")[0]);

    fetch.fetchUrl(uri, function getPlaylist(err, meta, body) {

        var mediaPlaylist;

        if (err) {
            console.error('Error downloading url:', uri);
            return complete(err);
        }

        if (body.toString().match(/#EXTINF/)) {
            mediaPlaylist = {
                targetDuration: 0,
                uri: uri,
                segments: []
            };
            parse.parseMediaPlaylist(mediaPlaylist, downloadPlaylist, dir, m3u8FileName);
        }

        function downloadPlaylist(playlist) {

            var rootUri = path.dirname(playlist.uri);
            streamToDisk = playlist.streamToDisk.bind(playlist);
            streamToDisk(rootUri, fileName, dir, downloadPlaylist, streamingWasFinished);
        }

        function streamingWasFinished(fileName, path) {

            return complete(err, path)
        }
    });
}
module.exports.downloadPlaylistSegments = downloadPlaylistSegments;