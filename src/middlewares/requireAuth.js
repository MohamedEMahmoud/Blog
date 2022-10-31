const NotAuthorizedError = require('../utils/errors/NotAuthorizedError');

module.exports = (req, _res, next) => {
	if (!req.currentUser.id || req.currentUser.role !== 'Author') {
		throw new NotAuthorizedError();
	}
	next();
};
