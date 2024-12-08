class HttpError extends Error {  //Custum Error constructer for including status code with message
    constructor(statusCode, message) {
      super(message); // Passing the message to the base Error class
      this.statusCode = statusCode; 
    }
  }

exports.HttpError = HttpError
  

exports.errorHandler = (err, req, res, next) => {  //Error handeling middleware
    const statusCode = err.statusCode || 500;  //If status code not presented
    const message = err.message || 'Internal Server Error';  //If message not prestend 
    res.status(statusCode).json({ message });
}

