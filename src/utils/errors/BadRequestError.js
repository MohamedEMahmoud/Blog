const CustomError = require('./CustomError');

class BadRequestError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = 400;
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializerErrors() {
		return [{ message: this.message, status: this.statusCode, success: false }];
	}
}

module.exports = BadRequestError;
