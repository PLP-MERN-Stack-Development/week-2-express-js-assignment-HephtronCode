// This function takes an async function in our controller
// and return a new function.
// if the promise is resolved, it continues.
// if the promise is rejected, it passes the error to the next middleware.
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
