function logger(req, res, next) {
    console.log(`[LOG] ${req.method} ${req.url} - ${new Date().toLocaleString()}`);
    next();
}

module.exports = logger;