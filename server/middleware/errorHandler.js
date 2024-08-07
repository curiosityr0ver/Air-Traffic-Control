function errorHandler(err, req, res, next) {
    err = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong'
    };
    res.status(err.statusCode).json(err);
}



module.exports = errorHandler;