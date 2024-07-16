const errorHandlerMiddleware = (error, req, res, next) => {
    console.log('Error: ', error);
    if (error.code && error.message) {
        const { code, message } = error;
        return res.status(code).json({ error: message });
    }
    else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = errorHandlerMiddleware;
