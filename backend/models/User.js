const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    likedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    profilePhoto: {
        type: String
    },
    profileBio: {
        type: String
    }
}, {
timestamps: true
})

module.exports = mongoose.model('User', userSchema);