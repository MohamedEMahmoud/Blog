const { check } = require('express-validator');
const validator = require('../../middlewares/validator');

exports.paperValidator = [
	check('name')
		.notEmpty()
		.withMessage('paper name is required')
		.isString()
		.withMessage('paper name must be string'),
	validator,
];

exports.paperValidatorId = [
	check('id').isMongoId().withMessage('Invalid paper id'),
	validator,
];
