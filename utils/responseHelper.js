exports.apiSuccessResponse = function(res, message, body, status) {
    status = status || 200;
    return res.status(status).json({
      success: true,
      message: message,
      data: body
    });
  };
  
  exports.apiErrorResponse = function(res, message, body, status) {
    status = status || 400;
    return res.status(status).json({
      success: false,
      message: message,
      body: body
    });
  };
  
  exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };
  
  exports.HTTP_STATUS_MESSAGE = {
    200: 'Success',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error'
  };
  