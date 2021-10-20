const boom = require('@hapi/boom');

// Retorna una funcion
function validatorHandler (schema, property) {
  // Estamos creando un middleware dinamico
  return(req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      // badRequest envia un error de tipo 400
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
