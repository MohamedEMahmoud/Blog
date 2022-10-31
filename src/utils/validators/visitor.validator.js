const { check } = require('express-validator');
const validator = require('../../middlewares/validator');

exports.visitorValidatorAuthorId = [
	check('authorId').isMongoId().withMessage('Invalid author id'),
	validator,
];

exports.visitorValidatorCategory = [
	check('category').isString().withMessage('category must be a string'),
	validator,
];

exports.visitorValidatorBoth = [
	check('authorId').isMongoId().withMessage('Invalid author id'),
	check('categoryId').isMongoId().withMessage('Invalid author id'),
	validator,
];
