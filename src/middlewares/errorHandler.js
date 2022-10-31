const CustomError = require('../utils/errors/CustomError');

module.exports = (err, _req, res, _next) => {
	err.statusCode = err.statusCode || 500;

	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializerErrors() });
	}

	res.status(err.statusCode).send({
		message: err.message,
		status: err.statusCode,
		stack: err.stack,
		success: false,
	});
};
