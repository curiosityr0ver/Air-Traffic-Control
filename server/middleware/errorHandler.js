function errorHandler(err, req, res, next) {
    console.log("Error handler called");
    res.status(400).json(err);
}



module.exports = errorHandler;