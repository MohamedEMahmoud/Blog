const { check } = require('express-validator');
const validator = require('../../middlewares/validator');
const Video = require('../../models/video.model');
const VideoSeries = require('../../models/video_series.model');
var ObjectId = require('mongoose').Types.ObjectId;
const BadRequestError = require('../errors/BadRequestError');

exports.videoSeriesValidator = [
	check('name')
		.notEmpty()
		.withMessage('video series name is required')
		.isString()
		.withMessage('video series name must be string')
		.custom(async (val) => {
			const videoSeriesExistingName = await VideoSeries.findOne({ name: val });
			if (videoSeriesExistingName) {
				throw new BadRequestError(`video series is already existing`);
			}
			return true;
		}),
	check('videos')
		.notEmpty()
		.withMessage('video series name is required')
		.custom((val) => {
			val.map((el) => {
				if (!ObjectId.isValid(el)) {
					throw new BadRequestError(`this id ${el} is not a valid`);
				}
			});
			return true;
		})
		.custom(async (valArr, { req }) => {
			const videos = await Video.find({
				author: req.currentUser.id,
				_id: { $in: valArr },
			});
			console.log(videos);
			console.log(valArr);
			if (valArr.length !== videos.length) {
				throw new BadRequestError('video not belong to you');
			}
			return true;
		}),
	validator,
];
