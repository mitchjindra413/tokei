const { check } = require("express-validator")
const handleValidationErrors = require('./handleValidationErrors')

const validatePostInput = [
    check('caption')
        .isLength({ max: 300 })
        .withMessage('Caption must be less than 300 characters'),
    check('author')
        .exists({ checkFalsy: true }),
    handleValidationErrors
];

module.exports = validatePostInput