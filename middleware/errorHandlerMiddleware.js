// const errorHandlerMiddleware = (error, req, res, next) => {
//     console.log('Error: ', error);
//     if (error.code && error.message) {
//         const { code, message } = error;
//         return res.status(code).json({ error: message });
//     }
//     else {
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = errorHandlerMiddleware;


const errorHandlerMiddleware = (error, req, res, next) => {
    console.log('Error: ', error);

    // Handle SyntaxError (invalid JSON)
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON payload provided' });
    }

    // Handle custom errors with code and message
    if (error.code && error.message) {
        const { code, message } = error;
        return res.status(code).json({ error: message });
    }

    // Fallback to generic 500 Internal Server Error
    return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandlerMiddleware;

