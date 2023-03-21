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
    hashedPassword: {
        type: String,
        required: true
    },
    following: {
        type: Map,
        of: {
            type: 'ObjectId',
            ref: 'User'
        },
        default: {}
    },
    // following: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "User"
    //     }
    // ],
    // posts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Post'
    //     }
    // ],
    likedPosts: {
        type: Map,
        of: Schema.Types.ObjectId,
        ref: "Post",
        default: {}
    },
    // likedPosts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Post'
    //     }
    // ],
    profilePhoto: {
        type: String,
        default: 'https://tokei-seed.s3.us-west-1.amazonaws.com/assets/blank.jpg'
    },
    profileBio: {
        type: String,
        default: ''
    }
}, {
timestamps: true
})

module.exports = mongoose.model('User', userSchema);