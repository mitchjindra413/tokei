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
    sound: {
        type: String
    },
    topic: {
        type: String
    },
    public: {
        type: Boolean,
        default: true
    },
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
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);