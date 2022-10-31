const { check } = require('express-validator');
const validator = require('../../middlewares/validator');

exports.articleValidator = [
	check('name')
		.notEmpty()
		.withMessage('Article name is required')
		.isString()
		.withMessage('Article name must be string'),
	validator,
];

exports.articleValidatorId = [
	check('id').isMongoId().withMessage('Invalid Article id'),
	validator,
];
