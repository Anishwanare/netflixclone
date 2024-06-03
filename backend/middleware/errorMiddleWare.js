class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Check if the error is a validation error
    if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors).map(error => error.message).join(' ');
        return res.status(400).json({ status: false, message: errorMessage });
    }

    return res.status(err.statusCode).json({ status: false, message: err.message });
};


export default ErrorHandler;