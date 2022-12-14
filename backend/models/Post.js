const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
    caption: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            message: {
                type: String,
                required: true
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    videoUrl: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);