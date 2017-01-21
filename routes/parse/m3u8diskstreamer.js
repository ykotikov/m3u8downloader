// Node modules
var path = require('path');
var mkdirp = require('mkdirp');
var fetch = require('fetch');
var fs = require('fs');
var request = require('request');
var mkdirp = require('mkdirp');


function downloadSegments(rootUri, fileName, dir, downloadPlaylist, streamingWasFinished) {

    var seg, tsFileName, i;

    for (i = 0; i < this.segments.length; i++) {
        seg = this.segments[i];
        if (!seg.downloaded) {
            if (!seg.resourcePath.match(/^https?:\/\//i)) {
                seg.resourcePath = rootUri + '/' + seg.resourcePath;
            }

            var playlist = this;
            return streamToDisk(seg, fileName, dir, downloadPlaylist, playlist);
        }

        if (i === this.segments.length - 1) {
            streamingWasFinished(fileName, dir + "/" + fileName)
        }

    }
}
function streamToDisk(seg, fileName, dir, downloadPlaylist, playlist) {

    console.info('Start downloading: ' + seg.resourcePath);
    fetch.fetchUrl(seg.resourcePath, function (err, meta, body) {

        if (err) {
            console.error("Error downloading file : " + seg.resourcePath)
        }
        if (fs.existsSync(dir + "/" + fileName)) {
            fileName += "8"
        }

        var path = dir + "/" + fileName;

        fs.appendFile(path, body, function (err) {
            if (err) console.error("Error with streaming file " + fileName)
        });

        console.info("Finished downloading : " + seg.resourcePath); // application/json; charset=utf-8
        seg.downloaded = true;
        downloadPlaylist(playlist);
    })
}

module.exports = downloadSegments;
