var path = require('path');
var fetch = require('fetch');
var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');


function downloadSegments(rootUri, fileName, dir, streamSegmentsToDisk, streamingWasFinished) {

    for (var i = 0; i < this.segments.length; i++) {
        var seg = this.segments[i];
        if (!seg.downloaded) {
            if (!seg.resourcePath.match(/^https?:\/\//i)) {
                seg.resourcePath = rootUri + '/' + seg.resourcePath;
            }
            var playlist = this;
            return streamToDisk(seg, fileName, dir, streamSegmentsToDisk, playlist);
        }

        if (i === this.segments.length - 1) {
            streamingWasFinished(dir + fileName)
        }

    }
}
function streamToDisk(seg, fileName, dir, streamSegmentsToDisk, playlist) {

    var path = dir + "/" + fileName;
    console.info('Start downloading: ' + seg.resourcePath);
    fetch.fetchUrl(seg.resourcePath, function (err, meta, body) {

        if (err) {
            console.error("Error downloading file : " + seg.resourcePath)
        }

        fs.appendFile(path, body, function (err) {
            if (err) console.error("Error with streaming file " + fileName)
        });

        console.info("Finished downloading : " + seg.resourcePath); // application/json; charset=utf-8
        seg.downloaded = true;
        streamSegmentsToDisk(playlist);
    })
}
module.exports = downloadSegments;
