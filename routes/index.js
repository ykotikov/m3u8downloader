var express = require('express');
var router = express.Router();
var s =require('./parse/m3u8downloader')
/* GET home page. */
router.get('/', function (req, res, next) {
    s.downloadPlaylistSegments({
            uri: "https://s3-us-west-2.amazonaws.com/sm3-dummy-streams/ads/ad-mod.m3u8",
            dir: "/home/kotikov/Desktop",
            fileName: "test.ts"
        },
        function () {
            console.log("streamer of chunk files complete");
        }
    )
});

module.exports = router;
