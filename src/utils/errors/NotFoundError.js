const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = 404;
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializerErrors() {
		return [{ message: this.message, status: this.statusCode, success: false }];
	}
}

module.exports = NotFoundError;
