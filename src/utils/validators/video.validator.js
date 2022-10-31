const { check } = require('express-validator');
const validator = require('../../middlewares/validator');

exports.videoValidator = [
	check('name')
		.notEmpty()
		.withMessage('video name is required')
		.isString()
		.withMessage('video name must be string'),
	validator,
];

exports.videoValidatorId = [
	check('id').isMongoId().withMessage('Invalid video id'),
	validator,
];
