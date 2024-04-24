const ErrorHander = require("../utils/errorHander");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500,
    err.message = err.message || "Internal Server Error"

    //Wrong mongodb _id error(long or short)
    if(err.name==="CastError"){
        const message = `Resource not found.Error:${err.path}`;
        err = new ErrorHander(message,400);
    }
    if(err.code===11000){
        const message = `Duplicate ${Objectkeys(err.keyValue)} entered.`;
        err = new ErrorHander(message,400);
    }
    if(err.name==="JsonWebTokenError"){
        const message = `Json web token in invalid,try again.`;
        err = new ErrorHander(message,400);
    }
    if(err.name==="TokenExpiredError"){
        const message = `Json web token jas been expired.`;
        err = new ErrorHander(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })
}