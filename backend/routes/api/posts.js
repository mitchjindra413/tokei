var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Post = mongoose.model('Post')
const {requireUser} = require('../../config/passport')
const validatePostInput = require('../../validations/posts')

// Show all posts
router.get('/', async (req, res, next) => {
    try{
        const posts = await Post.find()
            .populate("author", "_id, username")
            .sort({ createdAt: -1})
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
            .populate("author", "_id, username")
        
        return res.json(posts)
    } catch(err) {
        return res.json([])
    }
})

// Show specific post
router.get('/:id', async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id)
            .populate("author", "id, username")
        
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
            author: req.user._id
        })

        let post = await newPost.save()
        post = await post.populate('author', '_id, username')
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
            if(post.update(req.body)){
                
            }

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

module.exports = router;