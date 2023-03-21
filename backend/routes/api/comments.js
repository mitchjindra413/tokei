var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const Post = mongoose.model('Post')
const { requireUser } = require('../../config/passport')
const validateCommentInput = require('../../validations/posts')

// Get comments for post
router.get('/:postId', async (req, res, next) => {
    try {
        const comments = await Comment.find({post: req.params.postId})
            .populate('author', ['username', 'profilePhoto'])
        const commentsObj = {}
        for (let comment of comments) {
            commentsObj[comment._id] = comment
        }
        return res.json(commentsObj)
    } catch(err) {
        return res.json([])
    }
})

router.post('/:postId', requireUser, async (req, res, next) => {
    try {
        const newComment = {
            author: req.user._id,
            message: req.body.message,
            post: req.params.postId
        }
        
        let comment = await newComment.save()
        comment = await comment.populate('author', ['_id', 'username', 'profilePhoto'])
        return res.json(comment)
    } catch(err) {
        return next(err)
    }
})

// Edit post
router.patch('/:commentId', requireUser, validateCommentInput, async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)

        if (req.user._id.toString() === comment.author.toString()) {
            await comment.update(req.body)

            return res.json(post);
        } else {
            const error = new Error('Not owner of post')
            error.statusCode = 404
            error.errors = { message: 'Must be owner of post to update' }
            return next(error)
        }

    } catch (err) {
        return next(err)
    }
})

// Delete comment
router.delete('/:id', requireUser, async (req, res, next) => {
    try {
        const comment = await Comment.findById(
            req.params.id
        )
        if (req.user._id.toString() === comment.author.toString()) {
            await comment.delete()

            return res.json("Successfully deleted.");
        } else {
            const error = new Error('Not owner of post')
            error.statusCode = 404
            error.errors = { message: 'Must be owner of post to delete' }
            return next(error)
        }
    }
    catch (err) {
        return next(err)
    }
})

module.exports = router;