const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    text: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);