export const password = (value, helpers) => {
    if (value.length < 8) {
      return helpers.message('Password must be at least 8 characters');
    }
    if (!/\d/.test(value)) {
      return helpers.message('Password must contain at least one number');
    }
    if (!/[a-zA-Z]/.test(value)) {
      return helpers.message('Password must contain at least one letter');
    }
    return value;
  };

  export const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
  };