const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('name')
        .notEmpty().withMessage('Product name is required')
        .isString().withMessage('Product name must be a string'),
    body('description')
        .notEmpty().withMessage('Product description is required')
        .isString().withMessage('Product description must be a string'),
    body('price')
        .notEmpty().withMessage('Product price is required')
        .isNumeric().withMessage('Product price must be a number')
        .custom(value => {
            if (value < 0) {
                throw new Error('Price must be a positive number');
            }
            return true;
        }),
    body('category')
        .notEmpty().withMessage('Product category is required')
        .isString().withMessage('Product category must be a string'),
    body('inStock')
        .optional()
        .isBoolean().withMessage('In stock must be a boolean value'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Extract error messages in a simplified format
        const extractedErrors = errors.array().map(err => ({
            [err.param]: err.msg
        }));
        return res.status(400).json({ errors: extractedErrors });
    }
    next();
};

module.exports = {
    validateProduct,
    validateRequest
};
