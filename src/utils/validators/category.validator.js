const { check } = require('express-validator');
const validator = require('../../middlewares/validator');
const BadRequestError = require('../errors/BadRequestError');
const Article = require('../../models/article.model');
const Video = require('../../models/video.model');
const Paper = require('../../models/paper.model');

exports.categoryValidator = [
	check('name')
		.notEmpty()
		.withMessage('category name is required')
		.isString()
		.withMessage('category name must be string'),

	check('article')
		.notEmpty()
		.withMessage('category article is required')
		.isMongoId()
		.withMessage('Invalid Article id')
		.custom(async (val, { req }) => {
			const article = await Article.findById(val);
			if (!article || !article.author.equals(req.currentUser.id)) {
				throw new BadRequestError('article not exist or not belong to you');
			}
			return true;
		}),
	check('video')
		.notEmpty()
		.withMessage('category video is required')
		.isMongoId()
		.withMessage('Invalid Article id')
		.custom(async (val, { req }) => {
			const video = await Video.findById(val);
			if (!video || !video.author.equals(req.currentUser.id)) {
				throw new BadRequestError('video not exist or not belong to you');
			}
			return true;
		}),
	check('paper')
		.notEmpty()
		.withMessage('category paper is required')
		.isMongoId()
		.withMessage('Invalid Article id')
		.custom(async (val, { req }) => {
			const paper = await Paper.findById(val);
			if (!paper || !paper.author.equals(req.currentUser.id)) {
				throw new BadRequestError('paper not exist or not belong to you');
			}
			return true;
		}),
	validator,
];

exports.categoryValidatorId = [
	check('id').isMongoId().withMessage('Invalid Article id'),
	validator,
];
