const { check } = require("express-validator")
const handleValidationErrors = require('./handleValidationErrors')

const validateCommentInput = [
    check('text')
        .exists({checkFalsy: true})
        .isLength({ min: 3, max: 200 })
        .withMessage('Text must be less than 200 characters and greater than 3'),
    check('author')
        .exists({ checkFalsy: true }),
    check('postId')
        .exists({ checkFalsy: true}),
    handleValidationErrors
];

module.exports = validateCommentInput