var express = require('express');
var router = express.Router();
var m3u8downloader = require('./../public/javascripts/m3u8downloader');

router.get('/', function (req, res, next) {
    m3u8downloader.downloadPlaylistSegments({
            uri: "http://devimages.apple.com/iphone/samples/bipbop/gear1/prog_index.m3u8",
            dir: "/home/kotikov/Desktop/AppleM3u8Test",
            fileName: "test.ts"
        },
        function (err, path) {
            console.log("streamer of chunk files complete" + path);
            res.send("Downloading complete by path " + path)
        }
    )
});

module.exports = router;
