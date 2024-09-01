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

// export default validate;
import Joi from 'joi';

 const validate = (schema) => (req, res, next) => {
  const validSchema = ['params', 'query', 'body'].reduce((acc, key) => {
    if (schema[key]) {
      acc[key] = schema[key];
    }
    return acc;
  }, {});

  // Validate only the relevant parts of req (e.g., req.body, req.query, req.params)
  const validationObject = {};
  if (validSchema.body) validationObject.body = req.body;
  if (validSchema.query) validationObject.query = req.query;
  if (validSchema.params) validationObject.params = req.params;

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(validationObject);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).send({ message: errorMessage });
  }

  // Assign validated values back to req object, but only the parts that were validated
  if (value.body) req.body = value.body;
  if (value.query) req.query = value.query;
  if (value.params) req.params = value.params;

  return next();
};
export default validate;

