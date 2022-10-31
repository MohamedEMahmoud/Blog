const { check } = require('express-validator');
const validator = require('../../middlewares/validator');
const BadRequestError = require('../errors/BadRequestError');
const User = require('../../models/user.model');

exports.signupValidator = [
	check('email')
		.notEmpty()
		.withMessage('email is required')
		.isString()
		.withMessage('email must be string')
		.isEmail()
		.withMessage('invalid email')
		.custom(async (val) => {
			const existingUser = await User.findOne({ email: val });

			if (existingUser) {
				throw new BadRequestError('User already exists');
			}
			return true;
		}),

	check('password')
		.notEmpty()
		.withMessage('password is required')
		.isString()
		.withMessage('password must be string'),

	check('name')
		.notEmpty()
		.withMessage('name is required')
		.isString()
		.withMessage('name must be string'),
	validator,
];

exports.signinValidator = [
	check('email')
		.notEmpty()
		.withMessage('email is required')
		.isString()
		.withMessage('email must be string')
		.isEmail()
		.withMessage('invalid email'),

	check('password')
		.notEmpty()
		.withMessage('password is required')
		.isString()
		.withMessage('password must be string'),

	validator,
];
