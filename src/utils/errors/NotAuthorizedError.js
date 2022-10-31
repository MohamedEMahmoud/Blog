const CustomError = require('./CustomError');

class NotAuthorizedError extends CustomError {
	constructor() {
		super('Not Authorized!');
		this.statusCode = 401;
		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}

	serializerErrors() {
		return [{ message: this.message, status: this.statusCode, success: false }];
	}
}

module.exports = NotAuthorizedError;
