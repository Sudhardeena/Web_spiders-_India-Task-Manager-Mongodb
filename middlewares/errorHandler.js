class HttpError extends Error {
    constructor(statusCode, message) {
      super(message); // Pass the message to the base Error class
      this.statusCode = statusCode; // Attach the status code
    }
  }

exports.HttpError = HttpError
  

exports.errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
}

