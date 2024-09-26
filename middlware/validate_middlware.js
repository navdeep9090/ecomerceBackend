import Joi from 'joi';

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['body', 'params', 'query']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).send({ message: errorMessage });
  }

  req.body = value.body || req.body;
  req.params = value.params || req.params;
  req.query = value.query || req.query;

  return next();
};

export default validate;
