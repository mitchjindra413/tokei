const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    caption: {
        type: String
    },
    numberOfLikes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);