const ErrorResponse = require("../utils/errorResponse.js");

const errorHadler = (err, req, res, next) => {

    let error = { ...err }
        error.message = err.message;
    //Log to console dev.
    console.log(error);

    //Mongoos bad object
    if(err.name === 'CastError') {
        const message = `Resource not found with id ${err.value}`
        error = new ErrorResponse(message, 404)
    }

     //Mongoos Duplicate key
    if(err.name === 11000) {
        const message = `Duplicate file value entered`
        error = new ErrorResponse(message, 404)
    } 

    //Mongoose Validation Error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 404)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
};

module.exports = errorHadler;