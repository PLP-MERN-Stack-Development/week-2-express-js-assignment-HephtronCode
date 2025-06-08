// this allows the use of instanceof to check for custom errors
class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // Pass the message to the parent Error class
        this.statusCode = statusCode; // Set the HTTP status code
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Determine if the error is a client or server error
        this.isOperational = true; // Indicate that this is an operational error
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
    }
}

// specify error for when resource is not found (404)
class NotFoundError extends AppError {
    constructor(message = `Resource not found`) {
        super(message, 404); // Call the parent constructor with a 404 status code
    }
}

// Specify error for bad input
class BadRequestError extends AppError {
    constructor(message = `Bad request`) {
        super(message, 400);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    BadRequestError,
};