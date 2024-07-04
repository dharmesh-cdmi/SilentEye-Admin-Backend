const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false, stripUnknown: false });
    next();
  } catch (error) {
    console.log('Request Error: ', error);
    return res.status(400).send('Data validation failed');
  }
};

const validateParams = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.params, { abortEarly: false, stripUnknown: false });
    next();
  } catch (error) {
    console.log('Params Error: ', error);
    return res.status(400).send('Parameter validation failed');
  }
};

const validateQuery = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.query, { abortEarly: false, stripUnknown: false });
    next();
  } catch (error) {
    console.log('Query Error: ', error);
    return res.status(400).send('Query validation failed');
  }
};

module.exports = {
  validateParams,
  validateRequest,
  validateQuery
};
