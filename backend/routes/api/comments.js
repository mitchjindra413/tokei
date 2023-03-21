var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const Comments = mongoose.model('Comment')
const Post = mongoose.model('Post')

module.exports = router;