function errorHandler(err, req, res, next) {
    console.log("Error handler called");
    res.status(400).send(err);
}

module.exports = errorHandler;