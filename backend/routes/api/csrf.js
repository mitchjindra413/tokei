var express = require('express');
var router = express.Router();

const { isProduction } = require('../../config/keys')

if(!isProduction){
    router.get('/restore', function (req, res, next) {
        const csrfToken = req.csrfToken();
        res.status(200).json({
            'CSRF-TOKEN': csrfToken
        })
    });
}

module.exports = router;