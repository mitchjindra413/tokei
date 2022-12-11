var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.json({
        message: "GET /api/videos"
    })
});

module.exports = router;