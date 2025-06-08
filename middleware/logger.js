const logger = (req, res, next) => {
    // get current timestamp
    const timestamp = new Date().toISOString();
    // log request details
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    // call next middleware
    next();
};

module.exports = logger;
