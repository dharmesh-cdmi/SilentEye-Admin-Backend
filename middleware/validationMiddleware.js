const formatYupError = (error) => {
  const formattedErrors = {};

  error.inner.forEach((err) => {
    formattedErrors[err.path] = err.message;
  });

  return formattedErrors;
};

const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false, stripUnknown: false });
    next();
  } catch (error) {
    console.error('Request Validation Error:', error);
    const formattedErrors = formatYupError(error);
    return res.status(400).json({ error: 'Request validation failed', details: formattedErrors });
  }
};

const validateParams = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.params, { abortEarly: false, stripUnknown: false });
    next();
  } catch (error) {
    console.error('Params Validation Error:', error);
    const formattedErrors = formatYupError(error);
    return res.status(400).json({ error: 'Params validation failed', details: formattedErrors });
  }
};

const validateQuery = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.query, { abortEarly: false, stripUnknown: false });
    next();
  } catch (error) {
    console.error('Query Validation Error:', error);
    const formattedErrors = formatYupError(error);
    return res.status(400).json({ error: 'Query validation failed', details: formattedErrors });
  }
};

const validateFile = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    if (req.file.size > 10 * 1024 * 1024) { // Max file size of 10MB
      return res.status(400).json({ error: 'File size too large' });
    }
    if (!req.file.mimetype.startsWith('image/')) { // Only allow image files
      return res.status(400).json({ error: 'File type not allowed' });
    }

    next();
  } catch (error) {
    console.error('File Validation Error:', error);
    return res.status(400).json({ error: 'File validation failed' });
  }
};

module.exports = {
  validateParams,
  validateRequest,
  validateQuery,
  validateFile
};
