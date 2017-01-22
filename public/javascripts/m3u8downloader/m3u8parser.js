var fs = require('fs');
var path = require('path');
var fetch = require('fetch');
var streamer = require('./m3u8diskstreamer.js');

function parseMediaPlaylist(mediaPlaylist, streamSegmentsToDisk) {

    fetch.fetchUrl(mediaPlaylist.uri, function (err, meta, body) {

        var manifestLines = body.toString().split('\n'),
            currentLine,
            segments = [];

        for (var i = 0; i < manifestLines.length; i++) {
            currentLine = manifestLines[i];
            if (currentLine.match(/^#EXTINF/)) {
                i++;
                if (i < manifestLines.length) {
                    segments.push(parseResource(manifestLines[i]));
                }
            }
        }

        mediaPlaylist.segments = segments;
        mediaPlaylist.manifestLines = manifestLines;
        mediaPlaylist.streamToDisk = streamer;

        streamSegmentsToDisk(mediaPlaylist);
    });
}

function parseResource(resourceLine) {
    return {
        resourcePath: resourceLine,
        downloaded: false
    };
}

module.exports.parseMediaPlaylist = parseMediaPlaylist;