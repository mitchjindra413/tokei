const { check } = require("express-validator")
const handleValidationErrors = require('./handleValidationErrors')

const validatePostInput = [
    check('caption')
        .isLength({ max: 150 })
        .withMessage('Caption must be less than 150 characters'),
    check('author')
        .exists({ checkFalsy: true }),
    check('videoUrl')
        .exists({ checkFalsy: true }),
    handleValidationErrors
];

module.exports = validatePostInput