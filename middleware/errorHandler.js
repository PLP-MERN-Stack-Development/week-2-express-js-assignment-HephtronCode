const{ AppError } = require('../utils/customErrors');
const errorHandler = (err, req, res, next) => {
    // confirm if error is one of the custom errors, then we can trust it
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    
    // handle Mongoose validation errors
    if(err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({
            status: 'fail',
            message: 'Validation Error',
            errors
        });
    }

    // handle Mongoose duplicate key errors
    if(err.code === 11000) {
        return res.status(400).json({
            status: 'fail',
            message: 'Duplicate key error',
            errors: Object.keys(err.keyValue).map(key => `${key} already exists`)
        });
    }
    // handle other errors
    console.error(`UNEXPECTED ERROR: ${err.message}`); // Log the error for debugging
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong, it\'s\ not you, it\'s us. Please try again later.',
        error: err.message
    });
};

module.exports = errorHandler;

