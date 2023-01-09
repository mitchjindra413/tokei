var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Post = mongoose.model('Post')
const {requireUser} = require('../../config/passport')
const validatePostInput = require('../../validations/posts')

//AWS upload
const multer = require('multer')
const { S3 } = require("aws-sdk")
const { awsBucket } = require('../../config/keys');
const uuid = require("uuid").v4

const storage = multer.memoryStorage()

const s3Upload = async (userId, file) => {
    const s3 = new S3();

    const param = {
        Bucket: awsBucket,
        Key: `${userId}/${uuid()}-${file.originalname}`,
        Body: file.buffer,
    };

    return await s3.upload(param).promise()
};

const s3Delete = async (path) => {
    const s3 = new S3()

    
}

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true)
    } else {
        cb(new Error('File must be MP4 format'), false)
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 250000000, files: 1}})

router.post('/upload', requireUser, upload.single('video'), async (req, res, next) => {
    const result = await s3Upload(req.user._id, req.file)
    res.json({status: 'success', result})
})

// Show all posts
router.get('/', async (req, res, next) => {
    try{
        let posts

        if(req.query.topic != 'undefined'){
            posts = await Post.find({topic: req.query.topic})
                .populate("author", "_id, username")
                .sort({ createdAt: -1 })
                .limit(10)
        }
        else {
            posts = await Post.find()
                .populate("author", "_id, username")
                .sort({ createdAt: -1 })
                .limit(10)
        }
        return res.json(posts)
    } catch(err) {
        return res.json([])
    }
});

// Show all posts by User
router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId)
    } catch(err) {
        const error = new Error('User not found')
        error.statusCode = 404
        error.errors = {message: "No user found with that id"}
        return next(error)
    }

    try {
        const posts = await Post.find({author: user._id})
            .sort({createdAt: -1})
            .populate("author", "_id, username, profilePhoto")
        
        return res.json(posts)
    } catch(err) {
        return res.json([])
    }
})

// Show specific post
router.get('/:id', async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id)
            .populate("author", "id, username, profilePhoto")
        
        return res.json(post)
    } catch(err) {
        const error = new Error('Post not found')
        error.statusCode = 404
        error.errors = { message: 'No post found with that id'}
        return next(error)
    }
})

// Make post
router.post('/', requireUser, validatePostInput, async (req, res, next) => {
    try {
        const newPost = new Post({
            caption: req.body.caption,
            author: req.user._id,
            videoUrl: req.body.videoUrl
        })

        let post = await newPost.save()
        post = await post.populate('author', '_id, username, profilePhoto')
        return res.json(post)
    } catch(err){
        next(err)
    }
})

// Edit post
router.patch('/:postId', requireUser, validatePostInput, async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId)

        if (req.user._id.toString() === post.author.toString()) {
            await post.update(req.body)

            return res.json(post);
        } else {
            const error = new Error('Not owner of post')
            error.statusCode = 404
            error.errors = { message: 'Must be owner of post to update' }
            return next(error)
        }

    } catch (err) {
        next(err)
    }
})

// Delete post
router.delete('/:id', requireUser, async (req, res, next) => {   
    try {
        const post = await Post.findById(
            req.params.id
        )
        if(req.user._id.toString() === post.author.toString()){
            await post.delete()
    
            return res.json("Successfully deleted.");
        } else {
            const error = new Error('Not owner of post')
            error.statusCode = 404
            error.errors = { message: 'Must be owner of post to delete' }
            return next(error)
        }
    }
    catch (err) {
        next(err)
    }
})

// Routes for comments

// fetches all comments by postId
router.get("/:postId/comments", async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId)
        return res.json(post.comments)
    } catch(err) {
        return res.json([])
    }
})


// route for creating a comment
router.post("/:postId", requireUser, async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId)
        post.comments.push(req.body)
        await post.save()
        return res.json(post)
    } catch (err) {
        next(err)
    }
})


// route for updating a comment
// router.patch("/:postId/comments/:commentId", requireUser, async (req, res, next) => {
//         Post.findByIdAndUpdate(req.params.postId, req.body, { new: true })
//             .then(post => {
//                 let updateCommentIdx = "";
//                 post.comments.forEach((comment, idx) => {
//                     if (comment.id === req.params.commentId) {
//                         updateCommentIdx = idx
//                     }
//                 })

//                 if (updateCommentIdx === "") {
//                     return res.json({ nocommentfound: "No comment found with that ID" })
//                 }

//                 const { errors, isValid } = validateCommentInput(req.body);
//                 if (!isValid) {
//                     return res.status(400).json(errors)
//                 }

//                 post.comments[updateCommentIdx] = req.body
//                 // 

//                 post.save()

//                 return res.json(post.comments[updateCommentIdx])

//             })
//             .catch(err => res.status(400).json({ nopostfound: "No post found by that ID" }))

// })


// route for deleting a comment
// router.delete("/:postId/comments/:commentId",
//     requireUser,
//     (req, res) => {
//         Post.findByIdAndUpdate(req.params.postId, req.body)
//             .then(post => {
//                 let deleteComment = "";

//                 post.comments.forEach(comment => {
//                     if (comment.id === req.params.commentId) {
//                         deleteComment = comment
//                     }
//                 })

//                 if (deleteComment === "") {
//                     return res.json({ nocommentfound: "No comment found with that ID" })
//                 }


//                 deleteComment.remove()
//                 post.save()
//                     .then(post => res.json("Comment deleted"))
//                     .catch(err => res.status(400).json({ nocommentfound: "No comment found with that ID" }))

//             })
//             .catch(err => res.status(400).json({ nopostfound: "No post found by that ID" }))

//     })

module.exports = router;