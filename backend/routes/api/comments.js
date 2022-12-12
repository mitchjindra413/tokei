var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = mongoose.model('User')
const Post = mongoose.model('Post')
const { requireUser } = require('../../config/passport')
const validateCommentInput = require('../../validations/comments')

// Get comments for specific post
router.get('/post/:postId', async (req, res, next) => {
    let post;
    try {
        post = await Post.findById(req.params.userId)
    } catch (err) {
        const error = new Error('Post not found')
        error.statusCode = 404
        error.errors = { message: "No post found with that id" }
        return next(error)
    }

    try {
        const comments = await Comment.find({ postId: post._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id, username")

        return res.json(comments)
    } catch (err) {
        return res.json([])
    }
})

// Make a comment
router.post('/post/:postId', requireUser, async (req, res, next) => {
    try {
        const newComment = new Comment({
            text: req.body.text,
            author: req.user._id,
            postId: req.params.postId
        })

        let comment = await newComment.save()
        comment = await comment.populate('author', '_id, username text')
        return res.json(comment)
    } catch (err) {
        next(err)
    }
})

router.delete('/:commentId', requireUser, async (req, res, next) => {
    try {
        const comment = await Comment.findById(
            req.params.id
        )
        if (req.user._id.toString() === comment.author.toString()) {
            await comment.delete()

            return res.json("Successfully deleted.");
        } else {
            const error = new Error('Not owner of comment')
            error.statusCode = 404
            error.errors = { message: 'Must be owner of comment to delete' }
            return next(error)
        }
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;