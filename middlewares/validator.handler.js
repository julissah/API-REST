const { boom } = require("@hapi/boom");

function validatorHandler (schema, property) {
  return(req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      // badRequest envia un error de tipo 400
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
