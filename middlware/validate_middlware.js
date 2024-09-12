// import Joi from 'joi';

// const validate = (schema) => (req, res, next) => {
//   const validSchema = ['params', 'query', 'body'].reduce((acc, key) => {
//     if (schema[key]) {
//       acc[key] = schema[key];
//     }
//     return acc;
//   }, {});

//   const { value, error } = Joi.compile(validSchema)
//     .prefs({ errors: { label: 'key' }, abortEarly: false })
//     .validate(req);

//   if (error) {
//     const errorMessage = error.details.map((detail) => detail.message).join(', ');
//     return res.status(400).send({ message: errorMessage });
//   }

//   Object.assign(req, value);
//   return next();
// };

import Joi from 'joi';

// Validate middleware function
const validate = (schema) => (req, res, next) => {
  // Build validation object based on the schema provided
  const validationObject = {
    body: req.body,
    query: req.query,
    params: req.params,
  };

  // Filter out undefined schemas (i.e., if no body/query/params schema is provided)
  const validSchema = Object.keys(schema).reduce((acc, key) => {
    if (schema[key]) {
      acc[key] = schema[key];
    }
    return acc;
  }, {});

  // Validate the request data
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(validationObject);

  if (error) {
    // Map and join all error messages
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).send({ message: errorMessage });
  }

  // Assign validated values back to req
  req.body = value.body || req.body;
  req.query = value.query || req.query;
  req.params = value.params || req.params;

  return next();
};

export default validate;


